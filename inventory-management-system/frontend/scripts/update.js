async function updateInventory() {
  const itemId = document.getElementById("item-id").value;
  const quantity = parseInt(document.getElementById("quantity").value);

  if (!itemId || isNaN(quantity)) {
    alert("Please enter valid ID and quantity.");
    return;
  }

  try {
    const response = await fetch(`http://localhost:5001/api/inventory/${itemId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ quantity })
    });

    const result = await response.json();

    if (!response.ok) throw new Error(result.message || 'Update failed');

    alert(`Success! New quantity: ${result.quantity}`);
  } catch (err) {
    console.error(err);
    alert("Error updating inventory.");
  }
}
