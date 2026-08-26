import test from 'node:test';
import assert from 'node:assert/strict';
import { getFilteredFoods } from './foodMenuData.js';

test('filters by search text and category', () => {
  const result = getFilteredFoods({
    searchTerm: 'ayam',
    category: 'Makanan Utama',
    sortBy: 'nama',
  });

  assert.equal(result.length, 2);
  assert.deepEqual(
    result.map((item) => item.name),
    ['Mie Ayam', 'Sate Ayam']
  );
});

test('sorts by price from lowest to highest', () => {
  const result = getFilteredFoods({
    searchTerm: '',
    category: 'Semua Kategori',
    sortBy: 'harga-terendah',
  });

  assert.deepEqual(
    result.map((item) => item.price),
    [20000, 22000, 25000, 30000]
  );
});

test('returns all items for all categories', () => {
  const result = getFilteredFoods({
    searchTerm: '',
    category: 'Semua Kategori',
    sortBy: 'nama',
  });

  assert.equal(result.length, 4);
});
