import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';

interface User {
  id: string;
  username: string;
  password: string;
}

const users: User[] = [
  { id: "1", username: "test", password: "pass123" }
];

passport.use(new LocalStrategy((username, password, done) => {
  const user = users.find(u => u.username === username && u.password === password);
  if (!user) return done(null, false, { message: 'Invalid credentials' });
  return done(null, user);
}));

passport.serializeUser((user: any, done) => done(null, user.id));
passport.deserializeUser((id: string, done) => {
  const user = users.find(u => u.id === id);
  done(null, user || false);
});

export default passport;
export type { User };
export { users };