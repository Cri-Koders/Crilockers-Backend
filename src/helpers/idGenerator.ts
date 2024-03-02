export default function generateId(){
  let a = Date.now().toString(30);
  let b = Math.random().toString(30).substring(2);
  return a + b;

}
