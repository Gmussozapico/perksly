const express = require('express');
const prisma = require('../prismaClient');

const router = express.Router();

// GET /api/benefits
router.get('/', async (req, res) => {
  try {
    const { providerId, category, type, search, limit } = req.query;

    const where = { isActive: true };

    if (providerId) where.providerId = providerId;
    if (category) where.category = category;
    if (type) where.type = type;
    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
      ];
    }

    const benefits = await prisma.benefit.findMany({
      where,
      include: {
        provider: {
          include: { category: true },
        },
      },
      orderBy: { createdAt: 'desc' },
      take: limit ? parseInt(limit, 10) : undefined,
    });

    res.json(benefits);
  } catch (error) {
    console.error('Get benefits error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
