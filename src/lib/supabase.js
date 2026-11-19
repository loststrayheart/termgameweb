import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://fewqlxtweowvtzlyosqc.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_IltIp_hnjU012LdQz6g8kQ_qBjU6l07';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

/**
 * Save order to Supabase orders table with fallback to localStorage
 */
export async function createOrder(orderData) {
  try {
    // Attempt saving to Supabase
    const { data, error } = await supabase
      .from('orders')
      .insert([
        {
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
        }
      ])
      .select();

    if (error) {
      console.warn('Supabase insert note (using fallback):', error.message);
    } else {
      console.log('Order successfully saved to Supabase:', data);
    }
  } catch (err) {
    console.warn('Network error saving to Supabase:', err);
  }

  // Always keep localStorage updated as well
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
      // Map Supabase rows to app format
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

  // Fallback to localStorage
  try {
    return JSON.parse(localStorage.getItem('richman_orders') || '[]');
  } catch {
    return [];
  }
}

/**
 * Save / Update Profile in Supabase
 */
export async function syncUserProfile(user) {
  if (!user) return;
  try {
    const { error } = await supabase
      .from('profiles')
      .upsert({
        line_user_id: user.lineId,
        display_name: user.name,
        avatar_url: user.avatar,
        coins_balance: user.coins || 0
      }, { onConflict: 'line_user_id' });

    if (error) {
      console.warn('Profile sync note:', error.message);
    }
  } catch (err) {
    console.warn('Profile sync error:', err);
  }
}
