export function setupCounter(element: HTMLButtonElement) {
  let counter = 0

  // Fetch the current counter value from the Netlify function
  const fetchCounter = async () => {
    try {
      const res = await fetch('/counter');
      if (!res.ok) throw new Error('Failed to fetch counter');
      const data = await res.json();
      setCounter(data.count);
    } catch (err) {
      element.innerHTML = 'Error loading counter';
    }
  };

  // Increment the counter via the Netlify function
  const incrementCounter = async () => {
    try {
      const res = await fetch('/counter', { method: 'POST' });
      if (!res.ok) throw new Error('Failed to increment counter');
      const data = await res.json();
      setCounter(data.count);
    } catch (err) {
      element.innerHTML = 'Error incrementing counter';
    }
  };

  const setCounter = (count: number) => {
    counter = count
    element.innerHTML = `count is ${counter}`
  }

  element.addEventListener('click', incrementCounter)
  fetchCounter()
}
