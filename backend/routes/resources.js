const express = require('express');
const router = express.Router();

const resources = [
  {
    id: 1,
    title: 'National Suicide Prevention Lifeline',
    description: 'Free and confidential support for people in suicidal crisis or emotional distress.',
    phone: '1-800-273-8255',
    url: 'https://suicidepreventionlifeline.org',
    available: '24/7',
  },
  {
    id: 2,
    title: 'Crisis Text Line',
    description: 'Text HOME to 741741 to reach the Crisis Text Line.',
    phone: 'Text 741741',
    url: 'https://www.crisistextline.org',
    available: '24/7',
  },
  {
    id: 3,
    title: 'SAMHSA National Helpline',
    description: 'Free, confidential treatment referral and information service.',
    phone: '1-800-662-4357',
    url: 'https://www.samhsa.gov/find-help/national-helpline',
    available: '24/7',
  },
  {
    id: 4,
    title: 'Mental Health America',
    description: 'Information about mental health conditions and resources.',
    url: 'https://www.mhanational.org',
  },
  {
    id: 5,
    title: 'NAMI - National Alliance on Mental Illness',
    description: 'Support, education, and advocacy for people living with mental illness.',
    url: 'https://www.nami.org',
  },
];

router.get('/', (req, res) => {
  res.json({
    success: true,
    resources,
  });
});

module.exports = router;
