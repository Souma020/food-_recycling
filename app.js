// ReNourish - Food Recycling & Circular Economy Platform Application Logic

document.addEventListener('DOMContentLoaded', () => {
  initNavbarScroll();
  initThemeToggle();
  initImpactCalculator();
  initPathwayFilters();
  initRecipeAssistant();
  initMatchmaker();
  initCommunityBoard();
  initPledgeModal();
});

/* 1. Navbar Scroll & Theme Toggle */
function initNavbarScroll() {
  const navbar = document.querySelector('.navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });
}

function initThemeToggle() {
  const toggleBtn = document.getElementById('themeToggleBtn');
  const icon = toggleBtn.querySelector('i');
  
  toggleBtn.addEventListener('click', () => {
    const currentTheme = document.body.getAttribute('data-theme');
    if (currentTheme === 'light') {
      document.body.removeAttribute('data-theme');
      icon.className = 'fa-solid fa-moon';
    } else {
      document.body.setAttribute('data-theme', 'light');
      icon.className = 'fa-solid fa-sun';
    }
  });
}

/* 2. Food Impact Calculator */
function initImpactCalculator() {
  const weightInput = document.getElementById('calcWeight');
  const categorySelect = document.getElementById('calcCategory');
  const frequencySelect = document.getElementById('calcFrequency');
  
  const resCo2 = document.getElementById('resCo2');
  const resWater = document.getElementById('resWater');
  const resEnergy = document.getElementById('resEnergy');
  const resMeals = document.getElementById('resMeals');

  const updateCalculations = () => {
    const kg = parseFloat(weightInput.value) || 0;
    const catMultiplier = parseFloat(categorySelect.value) || 1.8;
    const freqMult = parseFloat(frequencySelect.value) || 1;
    
    const totalKg = kg * freqMult;
    
    // Multipliers based on EPA & FAO food waste factors
    const co2Kg = (totalKg * catMultiplier * 2.5).toFixed(1);
    const waterLiters = Math.round(totalKg * 1000 * (catMultiplier / 1.5));
    const energyKwh = (totalKg * 0.85).toFixed(1);
    const mealsCount = Math.round(totalKg / 0.42); // avg meal weight 420g

    resCo2.textContent = `${co2Kg} kg CO₂e`;
    resWater.textContent = `${waterLiters.toLocaleString()} Liters`;
    resEnergy.textContent = `${energyKwh} kWh`;
    resMeals.textContent = `${mealsCount.toLocaleString()} Meals Rescued`;
  };

  weightInput.addEventListener('input', updateCalculations);
  categorySelect.addEventListener('change', updateCalculations);
  frequencySelect.addEventListener('change', updateCalculations);
  
  updateCalculations();
}

/* 3. Pathway Filters */
const pathwayData = [
  {
    id: 1,
    title: 'Surplus Food Rescue & Redistribution',
    category: 'donation',
    icon: 'fa-hand-holding-heart',
    desc: 'Redirect edible surplus meals directly to local food banks, shelters, and community kitchens using real-time dispatch systems.',
    tags: ['High Impact', 'Direct Consumption', 'Zero Processing']
  },
  {
    id: 2,
    title: 'Upcycled Food Products & Ingredients',
    category: 'upcycling',
    icon: 'fa-arrows-spin',
    desc: 'Transform fruit peels, spent brewery grains, and produce misfits into flour, healthy snacks, cosmetics, and sustainable packaging.',
    tags: ['Value Addition', 'Circular Design', 'Innovation']
  },
  {
    id: 3,
    title: 'Community & Industrial Composting',
    category: 'composting',
    icon: 'fa-seedling',
    desc: 'Decompose inedible food scraps into humic bio-fertilizer and nutrient-rich soil blends to regenerate urban gardens and topsoil.',
    tags: ['Soil Regeneration', 'Organic Carbon', 'Zero Landfill']
  },
  {
    id: 4,
    title: 'Anaerobic Digestion & Bioenergy',
    category: 'bioenergy',
    icon: 'fa-bolt',
    desc: 'Convert organic food waste in oxygen-free digesters into clean biomethane gas for renewable heat, electricity, and clean transport fuel.',
    tags: ['Renewable Energy', 'Biogas', 'Methane Abatement']
  },
  {
    id: 5,
    title: 'Insect Farming & Animal Feed Valorization',
    category: 'upcycling',
    icon: 'fa-bug',
    desc: 'Utilize Black Soldier Fly larvae to process food waste rapidly into protein-dense livestock feed and natural organic frass fertilizer.',
    tags: ['High Efficiency', 'Protein Recovery', 'Bio-Conversion']
  },
  {
    id: 6,
    title: 'Bio-Plastics & Material Upcycling',
    category: 'upcycling',
    icon: 'fa-bottle-water',
    desc: 'Extract starch and pectin from waste streams to synthesize biodegradable polymers, replacing single-use petroleum plastics.',
    tags: ['Bio-Materials', 'Plastics Alternative', 'Green Tech']
  }
];

function initPathwayFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const container = document.getElementById('pathwaysGrid');

  const renderPathways = (filter = 'all') => {
    container.innerHTML = '';
    const items = filter === 'all' ? pathwayData : pathwayData.filter(p => p.category === filter);
    
    items.forEach(item => {
      const card = document.createElement('div');
      card.className = 'glass-card pathway-card';
      card.innerHTML = `
        <div class="pathway-icon">
          <i class="fa-solid ${item.icon}"></i>
        </div>
        <h3 class="pathway-title">${item.title}</h3>
        <p class="pathway-desc">${item.desc}</p>
        <div class="pathway-tags">
          ${item.tags.map(t => `<span class="tag">${t}</span>`).join('')}
        </div>
      `;
      container.appendChild(card);
    });
  };

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      renderPathways(btn.dataset.filter);
    });
  });

  renderPathways('all');
}

/* 4. Zero Waste Recipe & Scrap Assistant */
const recipeDatabase = [
  {
    ingredients: ['bananas', 'bread'],
    title: 'Caramelized Banana & Stale Bread Pudding',
    time: '20 mins',
    difficulty: 'Easy',
    steps: '1. Tear stale bread into chunks. 2. Mash overripe bananas with milk, brown sugar, and cinnamon. 3. Soak bread in banana mixture and bake for 15 mins at 180°C until golden brown.'
  },
  {
    ingredients: ['peels', 'vegetables'],
    title: 'Crispy Roasted Veggie Peel Chips & Stock',
    time: '25 mins',
    difficulty: 'Easy',
    steps: '1. Wash potato, carrot, and apple peels thoroughly. 2. Toss peels with olive oil, smoked paprika, and sea salt. 3. Air-fry or roast at 200°C for 12 mins until super crunchy.'
  },
  {
    ingredients: ['coffee', 'citrus'],
    title: 'Exfoliating Citrus & Coffee Grounds Body Scrub',
    time: '5 mins',
    difficulty: 'Super Quick',
    steps: '1. Mix 4 tbsp dried used coffee grounds with 2 tbsp coconut oil. 2. Add zest from lemon/orange peels. 3. Store in a glass jar for a natural zero-waste skincare scrub.'
  },
  {
    ingredients: ['milk', 'bread'],
    title: 'Savory Bread & Herb Strata',
    time: '30 mins',
    difficulty: 'Medium',
    steps: '1. Layer stale bread in a dish. 2. Whisk sour milk or milk with eggs, herbs, and cheese leftovers. 3. Bake until puffed and golden.'
  }
];

function initRecipeAssistant() {
  const chipBtns = document.querySelectorAll('.chip-btn');
  const findBtn = document.getElementById('findRecipeBtn');
  const resultCard = document.getElementById('recipeOutputCard');

  let selectedIngredients = [];

  chipBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      btn.classList.toggle('selected');
      const val = btn.dataset.ingredient;
      if (selectedIngredients.includes(val)) {
        selectedIngredients = selectedIngredients.filter(i => i !== val);
      } else {
        selectedIngredients.push(val);
      }
    });
  });

  findBtn.addEventListener('click', () => {
    if (selectedIngredients.length === 0) {
      resultCard.innerHTML = `<p style="color: var(--accent-amber);">Please select at least one leftover ingredient above!</p>`;
      return;
    }

    // Match recipe with highest overlap
    const matched = recipeDatabase.find(r => r.ingredients.some(ing => selectedIngredients.includes(ing))) || recipeDatabase[0];
    
    resultCard.innerHTML = `
      <div class="recipe-title"><i class="fa-solid fa-utensils"></i> ${matched.title}</div>
      <div style="display: flex; gap: 16px; margin: 8px 0; font-size: 0.85rem; color: var(--accent-lime);">
        <span><i class="fa-solid fa-clock"></i> ${matched.time}</span>
        <span><i class="fa-solid fa-signal"></i> ${matched.difficulty}</span>
      </div>
      <p class="recipe-steps">${matched.steps}</p>
    `;
  });
}

/* 5. Local Recycler Matchmaker */
function initMatchmaker() {
  const matchForm = document.getElementById('matchmakerForm');
  const outputContainer = document.getElementById('matchResults');

  matchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const type = document.getElementById('matchType').value;
    const qty = parseFloat(document.getElementById('matchQty').value) || 10;
    
    let recommendation = {};
    if (type === 'cooked') {
      recommendation = {
        name: 'City Harvest Food Rescue Network',
        channel: 'Surplus Food Redistribution',
        distance: '1.8 km away',
        action: 'Pickup Scheduled in ~30 mins',
        matchScore: '98% Optimal Match'
      };
    } else if (type === 'organic') {
      recommendation = {
        name: 'GreenLoop Anaerobic Bioenergy Digester',
        channel: 'Bioenergy & Digestate',
        distance: '3.4 km away',
        action: 'Accepts bulk food scraps for energy generation',
        matchScore: '95% Optimal Match'
      };
    } else if (type === 'bakery') {
      recommendation = {
        name: 'EcoFeed Livestock & Upcycled Flour Facility',
        channel: 'Upcycled Feed Production',
        distance: '2.1 km away',
        action: 'Converts bread & grains into protein feed',
        matchScore: '99% Optimal Match'
      };
    } else {
      recommendation = {
        name: 'Community Earth Compost Hub',
        channel: 'Vermicomposting',
        distance: '0.9 km away',
        action: 'Drop off spent coffee grounds & peels',
        matchScore: '96% Optimal Match'
      };
    }

    outputContainer.innerHTML = `
      <div style="padding: 20px; background: rgba(16, 185, 129, 0.12); border-radius: 12px; border: 1px solid var(--accent-mint);">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom: 8px;">
          <h4 style="color: var(--accent-mint); font-size: 1.15rem;">${recommendation.name}</h4>
          <span style="background: var(--accent-lime); color:#0b130e; font-weight:700; font-size:0.75rem; padding: 4px 8px; border-radius: 99px;">${recommendation.matchScore}</span>
        </div>
        <p style="color: var(--text-secondary); font-size: 0.9rem; margin-bottom:6px;"><strong>Channel:</strong> ${recommendation.channel}</p>
        <p style="color: var(--text-secondary); font-size: 0.9rem; margin-bottom:12px;"><strong>Distance:</strong> ${recommendation.distance}</p>
        <button class="btn btn-primary" style="padding: 8px 18px; font-size: 0.85rem;" onclick="alert('Pickup request submitted to ${recommendation.name}! Reference #RE-${Math.floor(Math.random()*90000+10000)}')">Request Express Dispatch</button>
      </div>
    `;
  });
}

/* 6. Community Board */
const defaultListings = [
  { type: 'surplus', title: '50 Fresh Artisan Sandwiches', meta: 'Grand Bakery • 1.2 km away', qty: '12 kg surplus' },
  { type: 'compost', title: '30 kg Fresh Coffee Grounds', meta: 'Espresso Hub • 0.5 km away', qty: 'Great for Nitrogen Soil' },
  { type: 'surplus', title: 'Uncut Fruit & Citrus Trays', meta: 'CaterEco Event • 2.5 km away', qty: '25 kg fresh produce' }
];

function initCommunityBoard() {
  const board = document.getElementById('listingsGrid');
  const postForm = document.getElementById('postListingForm');

  const renderBoard = () => {
    board.innerHTML = '';
    defaultListings.forEach(item => {
      const card = document.createElement('div');
      card.className = 'glass-card listing-card';
      const badgeClass = item.type === 'surplus' ? 'badge-surplus' : 'badge-compost';
      card.innerHTML = `
        <span class="listing-badge ${badgeClass}">${item.type}</span>
        <h4 class="listing-title">${item.title}</h4>
        <div class="listing-meta">${item.meta}</div>
        <div class="listing-qty">${item.qty}</div>
      `;
      board.appendChild(card);
    });
  };

  if (postForm) {
    postForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const title = document.getElementById('postTitle').value;
      const type = document.getElementById('postType').value;
      const qty = document.getElementById('postQty').value;

      if (title && qty) {
        defaultListings.unshift({
          type,
          title,
          meta: 'Your Location • Just now',
          qty
        });
        renderBoard();
        postForm.reset();
        alert('Your listing has been posted to the ReNourish Community Exchange!');
      }
    });
  }

  renderBoard();
}

/* 7. Zero Waste Digital Pledge Modal */
function initPledgeModal() {
  const openBtn = document.getElementById('openPledgeBtn');
  const modal = document.getElementById('pledgeModal');
  const closeBtn = document.getElementById('closeModalBtn');
  const pledgeForm = document.getElementById('pledgeForm');
  const certContainer = document.getElementById('certContainer');

  if (openBtn && modal) {
    openBtn.addEventListener('click', () => modal.classList.add('active'));
    closeBtn.addEventListener('click', () => modal.classList.remove('active'));
    
    modal.addEventListener('click', (e) => {
      if (e.target === modal) modal.classList.remove('active');
    });

    pledgeForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('pledgeName').value || 'Eco Champion';
      const date = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

      certContainer.innerHTML = `
        <div class="certificate-preview">
          <i class="fa-solid fa-award" style="font-size: 2.5rem; color: var(--accent-lime); margin-bottom: 12px;"></i>
          <h3 class="certificate-title">Zero-Waste Food Recycling Ambassador</h3>
          <p style="color: var(--text-secondary); margin-bottom: 12px;">This certifies that</p>
          <h2 style="color: var(--text-primary); margin-bottom: 12px; font-family: 'Outfit';">${name}</h2>
          <p style="font-size: 0.85rem; color: var(--text-muted); margin-bottom: 16px;">Has officially pledged to eliminate edible food waste, divert organic scraps to composting & bioenergy, and champion circular food systems.</p>
          <div style="font-size: 0.75rem; color: var(--accent-mint); border-top: 1px dashed var(--border-glass); padding-top: 10px;">
            Issued on ${date} • Certificate ID: #RN-${Math.floor(Math.random()*900000+100000)}
          </div>
        </div>
        <button class="btn btn-primary" style="width: 100%; margin-top: 16px;" onclick="window.print()">Download Digital Badge PDF</button>
      `;
    });
  }
}
