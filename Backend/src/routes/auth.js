import { Router } from 'express';
import { authenticate } from 'passport';
const router = Router();

router.get('/google', authenticate('google', { scope: ['profile', 'email'] }));

router.get('/google/callback', 
  authenticate('google', { failureRedirect: '/' }),
  (req, res) => {
    // Successful authentication, redirect home.
    res.redirect('/');
  });

router.get('/logout', (req, res) => {
  req.logout((err) => {
    if (err) { return next(err); }
    res.redirect('/');
  });
});

export default router;
