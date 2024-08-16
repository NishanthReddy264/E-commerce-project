const express = require('express');
const User = require('../models/user');
const router = express.Router();

router.get('/:userId', async (req, res) => {
  const { userId } = req.params;
  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).send('User not found');
    res.status(200).json(user.productList);
  } catch (error) {
    console.error('Error fetching cart:', error);
    res.status(500).send('Error fetching cart');
  }
});


router.post('/update', async (req, res) => {
  const { userId, productId, quantity } = req.body;
  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).send('User not found');
    
    const productIndex = user.productList.findIndex(item => item.productId == productId);
    if (productIndex >= 0) {
      user.productList[productIndex].quantity += 1;
    } else {
      user.productList.push({ productId, quantity });
    }

    await user.save();
    res.status(200).send('Cart updated');
  } catch (error) {
    console.error('Error updating cart:', error);
    res.status(500).send('Error updating cart');
  }
});


module.exports = router;
