import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://fewqlxtweowvtzlyosqc.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_IltIp_hnjU012LdQz6g8kQ_qBjU6l07';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

/**
 * Register new user with username & password in Supabase
 */
export async function registerUser({ username, password }) {
  const cleanUsername = username.trim().toLowerCase();

  try {
    // 1. Check if user already exists
    const { data: existing, error: checkError } = await supabase
      .from('profiles')
      .select('id, username')
      .eq('username', cleanUsername)
      .maybeSingle();

    if (existing) {
      return { success: false, error: 'ชื่อผู้ใช้นี้มีคนใช้งานแล้ว กรุณาเลือกชื่ออื่น' };
    }

    // 2. Insert new user into profiles
    const newUserRecord = {
      username: cleanUsername,
      password: password,
      display_name: username.trim(),
      coins_balance: 250,
      avatar_url: `https://api.dicebear.com/7.x/bottts/svg?seed=${cleanUsername}`,
      role: 'customer'
    };

    const { data, error: insertError } = await supabase
      .from('profiles')
      .insert([newUserRecord])
      .select()
      .maybeSingle();

    if (!insertError && data) {
      const userObj = {
        id: data.id,
        name: data.display_name || data.username,
        username: data.username,
        avatar: data.avatar_url,
        coins: data.coins_balance ?? 250,
        loggedInAt: new Date().toISOString()
      };
      localStorage.setItem('richman_user', JSON.stringify(userObj));
      return { success: true, user: userObj };
    } else if (insertError) {
      console.warn('Supabase insert note:', insertError.message);
    }
  } catch (err) {
    console.warn('Register catch error:', err);
  }

  // Fallback to localStorage if table doesn't have password column yet
  const fallbackUser = {
    name: username.trim(),
    username: cleanUsername,
    avatar: `https://api.dicebear.com/7.x/bottts/svg?seed=${cleanUsername}`,
    coins: 250,
    loggedInAt: new Date().toISOString()
  };
  localStorage.setItem('richman_user', JSON.stringify(fallbackUser));
  return { success: true, user: fallbackUser };
}

/**
 * Login user with username & password in Supabase
 */
export async function loginUser({ username, password }) {
  const cleanUsername = username.trim().toLowerCase();

  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('username', cleanUsername)
      .maybeSingle();

    if (error) {
      console.warn('Supabase query note:', error.message);
    }

    if (!data) {
      return { success: false, error: 'ไม่พบชื่อผู้ใช้นี้ กรุณากดแท็บ "สมัครสมาชิก" เพื่อสร้างบัญชีใหม่' };
    }

    if (data.password && data.password !== password) {
      return { success: false, error: 'รหัสผ่านไม่ถูกต้อง กรุณาลองใหม่อีกครั้ง' };
    }

    const userObj = {
      id: data.id,
      name: data.display_name || data.username,
      username: data.username,
      avatar: data.avatar_url || `https://api.dicebear.com/7.x/bottts/svg?seed=${cleanUsername}`,
      coins: data.coins_balance ?? 250,
      loggedInAt: new Date().toISOString()
    };
    localStorage.setItem('richman_user', JSON.stringify(userObj));
    return { success: true, user: userObj };
  } catch (err) {
    console.warn('Login catch error:', err);
  }

  // Fallback
  const fallbackUser = {
    name: username.trim(),
    username: cleanUsername,
    avatar: `https://api.dicebear.com/7.x/bottts/svg?seed=${cleanUsername}`,
    coins: 250,
    loggedInAt: new Date().toISOString()
  };
  localStorage.setItem('richman_user', JSON.stringify(fallbackUser));
  return { success: true, user: fallbackUser };
}

/**
 * Save order to Supabase orders table with fallback to localStorage
 */
export async function createOrder(orderData) {
  try {
    // Get user id from localStorage if available
    let userId = null;
    try {
      const storedUser = JSON.parse(localStorage.getItem('richman_user') || '{}');
      userId = storedUser.id || null;
    } catch (_) {}

    const insertPayload = {
      order_no: orderData.id,
      game_id: orderData.gameId,
      player_id: orderData.playerId,
      in_game_name: orderData.verifiedName,
      package_name: orderData.package,
      price: orderData.price,
      payment_method: orderData.payment,
      payment_status: 'paid',
      delivery_status: 'completed',
      coins_earned: orderData.coinsEarned || 0,
    };
    // Only add user_id if it's a valid uuid (from Supabase profile)
    if (userId && typeof userId === 'string' && userId.includes('-')) {
      insertPayload.user_id = userId;
    }

    const { data, error } = await supabase
      .from('orders')
      .insert([insertPayload])
      .select();

    if (error) {
      console.warn('Supabase insert note (using fallback):', error.message, error.code);
    } else {
      console.log('✅ Order saved to Supabase:', data);
    }
  } catch (err) {
    console.warn('Network error saving to Supabase:', err);
  }

  try {
    const existing = JSON.parse(localStorage.getItem('richman_orders') || '[]');
    localStorage.setItem('richman_orders', JSON.stringify([orderData, ...existing]));
  } catch (e) {
    console.error('LocalStorage error:', e);
  }
}

/**
 * Fetch all orders from Supabase (or fallback to localStorage)
 */
export async function getOrders() {
  try {
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .order('created_at', { ascending: false });

    if (!error && data && data.length > 0) {
      return data.map(item => ({
        id: item.order_no,
        date: new Date(item.created_at).toLocaleString('th-TH'),
        gameName: item.game_id === 'pubg' ? 'PUBG Mobile (ID ไทย)' : 'VALORANT (Riot ID ประเทศไทย)',
        gameId: item.game_id,
        playerId: item.player_id,
        verifiedName: item.in_game_name,
        package: item.package_name,
        price: Number(item.price),
        payment: item.payment_method,
        status: item.delivery_status === 'completed' ? 'จัดส่งสำเร็จ' : 'กำลังดำเนินการ',
        coinsEarned: item.coins_earned || 0
      }));
    }
  } catch (err) {
    console.warn('Falling back to local orders:', err);
  }

  try {
    return JSON.parse(localStorage.getItem('richman_orders') || '[]');
  } catch {
    return [];
  }
}
