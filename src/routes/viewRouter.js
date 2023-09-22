import { Router } from 'express';
import ProductManager from '../dao/filesystem/productManager.js';

const router = Router();
const pm = new ProductManager('../../products.json');

router.get('/', async (req, res) => {
  const products = await pm.getProducts();

  res.render('home', { products });
});

router.get('/realtimeproducts', (req, res) => {
  res.render('realtimeproducts');
});

router.get('/chat', (req, res) => {
  res.render('chat', {});
});

export default router;