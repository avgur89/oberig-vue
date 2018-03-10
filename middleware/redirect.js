export default function redirectMiddleware({ redirect }) {
  console.log('Trying to access non-existent page. Redirecting...');
  redirect('/error');
}
