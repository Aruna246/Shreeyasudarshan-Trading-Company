import { neon, neonConfig } from '@neondatabase/serverless';
import type { Product, Order } from './catalog';

export const DEFAULT_DATABASE_URL = 'postgresql://neondb_owner:npg_Zk1rF3GlXPxI@ep-old-haze-b3ckv4oe-pooler.c-4.ap-southeast-1.aws.neon.tech/shreeyasudarshan-trading-company?sslmode=require&channel_binding=require';

const NEON_DB_URL_KEY = 'ss_neon_database_url';

// Fix endpoint resolution for regional sub-clusters (e.g. c-4.ap-southeast-1.aws.neon.tech)
if (typeof neonConfig !== 'undefined' && neonConfig) {
  const origFetchEndpoint = neonConfig.fetchEndpoint;
  neonConfig.fetchEndpoint = (host: string, port?: number) => {
    if (host && (host.includes('.c-') || host.includes('-pooler'))) {
      return `https://${host}/sql`;
    }
    return origFetchEndpoint ? origFetchEndpoint(host, port) : `https://${host}/sql`;
  };
}

export function getSavedDatabaseUrl(): string {
  try {
    const stored = typeof localStorage !== 'undefined' ? localStorage.getItem(NEON_DB_URL_KEY) : null;
    if (stored && stored.trim()) return stored.trim();
    return (
      (typeof process !== 'undefined' && process.env?.DATABASE_URL) ||
      (typeof import.meta !== 'undefined' && (import.meta as any).env?.VITE_DATABASE_URL) ||
      DEFAULT_DATABASE_URL
    );
  } catch {
    return DEFAULT_DATABASE_URL;
  }
}

export function saveDatabaseUrl(url: string): void {
  try {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(NEON_DB_URL_KEY, url.trim());
    }
  } catch {}
}

export function getNeonSql(customUrl?: string) {
  const connectionString = customUrl ?? getSavedDatabaseUrl();
  if (!connectionString) return null;
  try {
    return neon(connectionString);
  } catch (err) {
    console.error('Failed to create Neon client:', err);
    return null;
  }
}

export async function initNeonTables(customUrl?: string): Promise<{ success: boolean; message: string }> {
  const sql = getNeonSql(customUrl);
  if (!sql) {
    return { success: false, message: 'No Database Connection String provided.' };
  }

  try {
    // 1. Create products table
    await sql`
      CREATE TABLE IF NOT EXISTS ss_products (
        id VARCHAR(255) PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        category VARCHAR(100) NOT NULL,
        material VARCHAR(255) NOT NULL,
        price NUMERIC NOT NULL,
        image TEXT NOT NULL,
        badge VARCHAR(100),
        description TEXT,
        size VARCHAR(100),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `;

    // 2. Create orders table
    await sql`
      CREATE TABLE IF NOT EXISTS ss_orders (
        id VARCHAR(255) PRIMARY KEY,
        customer_name VARCHAR(255) NOT NULL,
        email VARCHAR(255),
        phone VARCHAR(100),
        address TEXT,
        date VARCHAR(100),
        items JSONB NOT NULL,
        total_amount NUMERIC NOT NULL,
        status VARCHAR(50) NOT NULL,
        payment_method VARCHAR(100),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `;

    return { success: true, message: 'Neon Database tables verified & initialized successfully!' };
  } catch (error: any) {
    console.error('Neon Init error:', error);
    return { success: false, message: error?.message || 'Failed to initialize database tables.' };
  }
}

export async function fetchProductsFromDb(customUrl?: string): Promise<Product[] | null> {
  const sql = getNeonSql(customUrl);
  if (!sql) return null;

  try {
    const rows = await sql`SELECT * FROM ss_products ORDER BY created_at DESC;`;
    if (!rows || rows.length === 0) return null;
    return rows.map((r: any) => ({
      id: r.id,
      name: r.name,
      category: r.category,
      material: r.material,
      price: Number(r.price),
      image: r.image,
      badge: r.badge || '',
      description: r.description || '',
      size: r.size || '',
    }));
  } catch (error) {
    console.error('Error fetching products from DB:', error);
    return null;
  }
}

export async function syncProductToDb(product: Product, customUrl?: string): Promise<boolean> {
  const sql = getNeonSql(customUrl);
  if (!sql) return false;

  try {
    await sql`
      INSERT INTO ss_products (id, name, category, material, price, image, badge, description, size)
      VALUES (
        ${product.id},
        ${product.name},
        ${product.category},
        ${product.material},
        ${product.price},
        ${product.image},
        ${product.badge},
        ${product.description},
        ${product.size}
      )
      ON CONFLICT (id) DO UPDATE SET
        name = EXCLUDED.name,
        category = EXCLUDED.category,
        material = EXCLUDED.material,
        price = EXCLUDED.price,
        image = EXCLUDED.image,
        badge = EXCLUDED.badge,
        description = EXCLUDED.description,
        size = EXCLUDED.size;
    `;
    return true;
  } catch (error) {
    console.error('Error syncing product to DB:', error);
    return false;
  }
}

export async function deleteProductFromDb(id: string, customUrl?: string): Promise<boolean> {
  const sql = getNeonSql(customUrl);
  if (!sql) return false;

  try {
    await sql`DELETE FROM ss_products WHERE id = ${id};`;
    return true;
  } catch (error) {
    console.error('Error deleting product from DB:', error);
    return false;
  }
}

export async function fetchOrdersFromDb(customUrl?: string): Promise<Order[] | null> {
  const sql = getNeonSql(customUrl);
  if (!sql) return null;

  try {
    const rows = await sql`SELECT * FROM ss_orders ORDER BY created_at DESC;`;
    if (!rows || rows.length === 0) return null;
    return rows.map((r: any) => ({
      id: r.id,
      customerName: r.customer_name,
      email: r.email,
      phone: r.phone,
      address: r.address,
      date: r.date,
      items: typeof r.items === 'string' ? JSON.parse(r.items) : r.items,
      totalAmount: Number(r.total_amount),
      status: r.status,
      paymentMethod: r.payment_method,
    }));
  } catch (error) {
    console.error('Error fetching orders from DB:', error);
    return null;
  }
}

export async function syncOrderToDb(order: Order, customUrl?: string): Promise<boolean> {
  const sql = getNeonSql(customUrl);
  if (!sql) return false;

  try {
    await sql`
      INSERT INTO ss_orders (id, customer_name, email, phone, address, date, items, total_amount, status, payment_method)
      VALUES (
        ${order.id},
        ${order.customerName},
        ${order.email},
        ${order.phone},
        ${order.address},
        ${order.date},
        ${JSON.stringify(order.items)},
        ${order.totalAmount},
        ${order.status},
        ${order.paymentMethod}
      )
      ON CONFLICT (id) DO UPDATE SET
        status = EXCLUDED.status;
    `;
    return true;
  } catch (error) {
    console.error('Error syncing order to DB:', error);
    return false;
  }
}
