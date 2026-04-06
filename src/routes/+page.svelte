<script>
  /** @type {{ data: { items: Array<{ img: string, name: string, desc: string, price: number, locked: boolean }> } }} */
  let { data } = $props();

  /** @type {string[]} */
  let cardEffects = $state([]);
  /** @type {Map<number, ReturnType<typeof setTimeout>>} */
  const resetTimers = new Map();

  /** @param {number} index @param {boolean} isLocked */
  function handleOrderClick(index, isLocked) {
    const effect = isLocked ? 'is-shaking' : 'is-pulsing';

    cardEffects[index] = '';
    cardEffects = [...cardEffects];

    requestAnimationFrame(() => {
      cardEffects[index] = effect;
      cardEffects = [...cardEffects];
    });

    const existingTimer = resetTimers.get(index);
    if (existingTimer) clearTimeout(existingTimer);

    const resetDelayMs = isLocked ? 360 : 280;
    const timer = setTimeout(() => {
      cardEffects[index] = '';
      cardEffects = [...cardEffects];
      resetTimers.delete(index);
    }, resetDelayMs);

    resetTimers.set(index, timer);
  }
</script>

<svelte:head>
  <title>Resolution Hardware Shop</title>
</svelte:head>

<main class="shop-page">
  <header class="shop-header">
    <h1>Resolution Hardware Shop</h1>
  </header>

  <div class="top-divider"></div>
  <p style="font-family: 'Departure Mono', monospace;">Shop is still WIP, more items will be added soon and prices will be fixed</p>

  <section class="cards-grid" aria-label="Shop items">
    {#each data.items as item, index}
      <article class={`item-card ${cardEffects[index] ?? ''}`} aria-label={item.name}>
        <div class="item-image-wrap">
          <img class="item-image" src={item.img} alt={item.name} loading="lazy" />
        </div>

        <div class="card-divider"></div>

        <div class="item-copy">
          <h2>{item.name}</h2>
          <p>{item.desc}</p>
        </div>

        <div class="card-divider"></div>

        <button
          type="button"
          class="item-price-row"
          aria-label={`${item.locked ? 'Locked item' : 'Buy'} ${item.name}`}
          onclick={() => handleOrderClick(index, item.locked)}
        >
          <span class="price-label">{item.locked ? 'LOCKED' : 'BUY'}</span>
          <span class="item-price">{item.price} Coins</span>
        </button>


      </article>
    {/each}
  </section>

  <footer class="shop-footer">
    <p>
      want something else added in the shop?
      #<a href="/suggest-form" aria-label="Open suggestion form">fill out the suggestion form</a>
    </p>
  </footer>
</main>
