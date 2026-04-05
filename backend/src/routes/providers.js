const express = require('express');
const prisma = require('../prismaClient');

const router = express.Router();

// GET /api/providers
router.get('/', async (req, res) => {
  try {
    const providers = await prisma.provider.findMany({
      include: {
        category: true,
        _count: { select: { benefits: { where: { isActive: true } } } },
      },
      orderBy: { name: 'asc' },
    });
    res.json(providers);
  } catch (error) {
    console.error('Get providers error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET /api/providers/categories
router.get('/categories', async (req, res) => {
  try {
    const categories = await prisma.providerCategory.findMany({
      include: {
        _count: { select: { providers: true } },
      },
      orderBy: { name: 'asc' },
    });
    res.json(categories);
  } catch (error) {
    console.error('Get categories error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET /api/providers/:id
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const provider = await prisma.provider.findFirst({
      where: { OR: [{ id }, { slug: id }] },
      include: {
        category: true,
        benefits: {
          where: { isActive: true },
          orderBy: { createdAt: 'desc' },
        },
      },
    });

    if (!provider) {
      return res.status(404).json({ error: 'Provider not found' });
    }

    res.json(provider);
  } catch (error) {
    console.error('Get provider error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
