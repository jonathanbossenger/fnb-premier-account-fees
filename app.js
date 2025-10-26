// Global data storage
let appData = null;
let currentFilter = 'all';

// Initialize the application
document.addEventListener('DOMContentLoaded', async () => {
    try {
        await loadData();
        renderAll();
        setupEventListeners();
    } catch (error) {
        console.error('Error initializing app:', error);
        showError('Failed to load data. Please refresh the page.');
    }
});

// Load JSON data
async function loadData() {
    const response = await fetch('data.json');
    if (!response.ok) {
        throw new Error('Failed to fetch data');
    }
    appData = await response.json();
}

// Render all sections
function renderAll() {
    renderAccounts();
    renderNoChargeFees();
    renderStandardFees();
    renderCashFees();
    renderRealTimeFees();
    renderEWalletFees();
    renderCreditFacilities();
    renderGlobalAccount();
    renderTravelFees();
    renderBenefits();
    updateResultsCount();
}

// Render account types
function renderAccounts() {
    const container = document.getElementById('accountsList');
    if (!appData.accountTypes) return;

    const html = appData.accountTypes.map(account => `
        <div class="card" data-searchable="${account.name} ${account.description} ${account.features?.join(' ') || ''}">
            <h3>${account.name}</h3>
            <div class="price">R${account.monthlyFee.toFixed(2)} p.m.</div>
            <p class="description">${account.description}</p>
            ${account.features ? `
                <ul>
                    ${account.features.map(feature => `<li>${feature}</li>`).join('')}
                </ul>
            ` : ''}
        </div>
    `).join('');

    container.innerHTML = html;
}

// Render no charge fees
function renderNoChargeFees() {
    const container = document.getElementById('noChargeFees');
    if (!appData.transactionFees?.noCharge) return;

    const html = `
        <table>
            <thead>
                <tr>
                    <th>Category</th>
                    <th>Description</th>
                    <th>Fee</th>
                </tr>
            </thead>
            <tbody>
                ${appData.transactionFees.noCharge.map(fee => `
                    <tr data-searchable="${fee.category} ${fee.description}">
                        <td>${fee.category}</td>
                        <td>${fee.description}</td>
                        <td class="no-charge">No charge</td>
                    </tr>
                `).join('')}
            </tbody>
        </table>
    `;

    container.innerHTML = html;
}

// Render standard fees
function renderStandardFees() {
    const container = document.getElementById('standardFees');
    if (!appData.transactionFees?.standardFees) return;

    const html = `
        <table>
            <thead>
                <tr>
                    <th>Category</th>
                    <th>Description</th>
                    <th>Fee</th>
                    <th>Channel</th>
                </tr>
            </thead>
            <tbody>
                ${appData.transactionFees.standardFees.map(fee => `
                    <tr data-searchable="${fee.category} ${fee.description} ${fee.channel || ''}">
                        <td>${fee.category}</td>
                        <td>${fee.description}</td>
                        <td class="fee-amount">${formatFee(fee.fee)}</td>
                        <td>${fee.channel || '-'}</td>
                    </tr>
                `).join('')}
            </tbody>
        </table>
    `;

    container.innerHTML = html;
}

// Render cash fees
function renderCashFees() {
    const container = document.getElementById('cashFees');
    if (!appData.transactionFees?.cashTransactions) return;

    const html = `
        <table>
            <thead>
                <tr>
                    <th>Category</th>
                    <th>Description</th>
                    <th>Fee</th>
                    <th>Note</th>
                </tr>
            </thead>
            <tbody>
                ${appData.transactionFees.cashTransactions.map(fee => `
                    <tr data-searchable="${fee.category} ${fee.description} ${fee.note || ''}">
                        <td>${fee.category}</td>
                        <td>${fee.description}</td>
                        <td class="fee-amount">${formatFee(fee.fee)}</td>
                        <td class="note">${fee.note || '-'}</td>
                    </tr>
                `).join('')}
            </tbody>
        </table>
    `;

    container.innerHTML = html;
}

// Render real-time payment fees
function renderRealTimeFees() {
    const container = document.getElementById('realTimeFees');
    if (!appData.transactionFees?.realTimePayments) return;

    const html = `
        <table>
            <thead>
                <tr>
                    <th>Category</th>
                    <th>Description</th>
                    <th>Fee</th>
                    <th>Details</th>
                </tr>
            </thead>
            <tbody>
                ${appData.transactionFees.realTimePayments.map(fee => `
                    <tr data-searchable="${fee.category} ${fee.description} ${fee.limit || ''}">
                        <td>${fee.category}</td>
                        <td>${fee.description}</td>
                        <td class="no-charge">No charge</td>
                        <td class="note">${fee.limit || ''}</td>
                    </tr>
                `).join('')}
            </tbody>
        </table>
    `;

    container.innerHTML = html;
}

// Render eWallet fees
function renderEWalletFees() {
    const container = document.getElementById('eWalletFees');
    const sendMoney = appData.transactionFees?.sendMoney || [];
    const eWallet = appData.transactionFees?.eWallet || [];
    const allFees = [...sendMoney, ...eWallet];

    if (allFees.length === 0) return;

    const html = `
        <table>
            <thead>
                <tr>
                    <th>Category</th>
                    <th>Description</th>
                    <th>Fee</th>
                    <th>Note</th>
                </tr>
            </thead>
            <tbody>
                ${allFees.map(fee => `
                    <tr data-searchable="${fee.category} ${fee.description} ${fee.note || ''}">
                        <td>${fee.category}</td>
                        <td>${fee.description}</td>
                        <td class="fee-amount">${formatFee(fee.fee)}</td>
                        <td class="note">${fee.note || fee.limit || '-'}</td>
                    </tr>
                `).join('')}
            </tbody>
        </table>
    `;

    container.innerHTML = html;
}

// Render credit facilities
function renderCreditFacilities() {
    const container = document.getElementById('creditList');
    if (!appData.creditFacilities) return;

    const html = `
        <table>
            <thead>
                <tr>
                    <th>Facility Type</th>
                    <th>Monthly Service Fee</th>
                    <th>Other Fees</th>
                    <th>Note</th>
                </tr>
            </thead>
            <tbody>
                ${appData.creditFacilities.map(credit => `
                    <tr data-searchable="${credit.name} ${credit.note || ''}">
                        <td>${credit.name}</td>
                        <td class="fee-amount">R${credit.monthlyServiceFee.toFixed(2)}</td>
                        <td>${credit.initiationFee ? `Initiation: ${credit.initiationFee}` : '-'}
                            ${credit.monthlyNonUtilisationFee ? `<br>Non-utilisation: R${credit.monthlyNonUtilisationFee.toFixed(2)}` : ''}</td>
                        <td class="note">${credit.note || '-'}</td>
                    </tr>
                `).join('')}
            </tbody>
        </table>
    `;

    container.innerHTML = html;
}

// Render global account
function renderGlobalAccount() {
    const container = document.getElementById('globalAccountList');
    if (!appData.globalAccount) return;

    const html = `
        <table>
            <thead>
                <tr>
                    <th>Currency</th>
                    <th>Annual Card Fee</th>
                    <th>ATM Withdrawal</th>
                    <th>Card Replacement</th>
                    <th>Balance Enquiry</th>
                </tr>
            </thead>
            <tbody>
                ${appData.globalAccount.map(account => `
                    <tr data-searchable="${account.currency} global account foreign">
                        <td><strong>${account.currency}</strong></td>
                        <td class="fee-amount">${account.currency === 'USD' ? '$' : account.currency === 'EUR' ? '€' : '£'}${account.annualCardFee.toFixed(2)}</td>
                        <td class="fee-amount">${account.currency === 'USD' ? '$' : account.currency === 'EUR' ? '€' : '£'}${account.atmWithdrawal.toFixed(2)}</td>
                        <td class="fee-amount">${account.currency === 'USD' ? '$' : account.currency === 'EUR' ? '€' : '£'}${account.cardReplacement.toFixed(2)}</td>
                        <td class="fee-amount">${account.currency === 'USD' ? '$' : account.currency === 'EUR' ? '€' : '£'}${account.balanceEnquiry.toFixed(2)}</td>
                    </tr>
                `).join('')}
            </tbody>
        </table>
    `;

    container.innerHTML = html;
}

// Render travel fees
function renderTravelFees() {
    const container = document.getElementById('travelFees');
    if (!appData.eBucksTravel) return;

    // Group by category
    const grouped = appData.eBucksTravel.reduce((acc, fee) => {
        if (!acc[fee.category]) {
            acc[fee.category] = [];
        }
        acc[fee.category].push(fee);
        return acc;
    }, {});

    const html = Object.entries(grouped).map(([category, fees]) => `
        <div class="subsection">
            <h3>${category}</h3>
            <table>
                <thead>
                    <tr>
                        <th>Service</th>
                        <th>Fee</th>
                        <th>Max Fee</th>
                    </tr>
                </thead>
                <tbody>
                    ${fees.map(fee => `
                        <tr data-searchable="${category} ${fee.service} travel">
                            <td>${fee.service}</td>
                            <td class="fee-amount">R${fee.fee.toFixed(2)}</td>
                            <td class="note">${fee.maxFee ? `R${fee.maxFee.toFixed(2)}` : '-'}</td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        </div>
    `).join('');

    container.innerHTML = html;
}

// Render benefits
function renderBenefits() {
    const container = document.getElementById('benefitsList');
    if (!appData.benefits) return;

    const html = Object.values(appData.benefits).map(benefit => `
        <div class="card benefit-card" data-searchable="${benefit.title} ${benefit.description} ${benefit.partners?.join(' ') || ''}">
            <h3>${benefit.title}</h3>
            <p>${benefit.description}</p>
            ${benefit.partners ? `
                <ul>
                    ${benefit.partners.map(partner => `<li>${partner}</li>`).join('')}
                </ul>
            ` : ''}
            ${benefit.note ? `<p class="note">${benefit.note}</p>` : ''}
        </div>
    `).join('');

    container.innerHTML = html;
}

// Setup event listeners
function setupEventListeners() {
    const searchInput = document.getElementById('searchInput');
    searchInput.addEventListener('input', handleSearch);

    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(btn => {
        btn.addEventListener('click', handleFilter);
    });
}

// Handle search
function handleSearch(e) {
    const searchTerm = e.target.value.toLowerCase();
    const allSearchable = document.querySelectorAll('[data-searchable]');

    allSearchable.forEach(element => {
        const content = element.getAttribute('data-searchable').toLowerCase();
        const matches = content.includes(searchTerm);

        if (searchTerm === '') {
            element.style.display = '';
        } else if (matches) {
            element.style.display = '';
        } else {
            element.style.display = 'none';
        }
    });

    updateResultsCount();
}

// Handle filter
function handleFilter(e) {
    const filter = e.target.getAttribute('data-filter');
    currentFilter = filter;

    // Update active button
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    e.target.classList.add('active');

    // Show/hide sections
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        if (filter === 'all') {
            section.classList.remove('hidden');
        } else {
            if (section.id === filter) {
                section.classList.remove('hidden');
            } else {
                section.classList.add('hidden');
            }
        }
    });

    updateResultsCount();
}

// Update results count
function updateResultsCount() {
    const visibleItems = document.querySelectorAll('[data-searchable]');
    const displayed = Array.from(visibleItems).filter(el => el.style.display !== 'none').length;
    const total = visibleItems.length;

    const resultsCount = document.getElementById('resultsCount');
    const searchTerm = document.getElementById('searchInput').value;

    if (searchTerm) {
        resultsCount.textContent = `Showing ${displayed} of ${total} results`;
    } else {
        resultsCount.textContent = `Showing all ${total} items`;
    }
}

// Format fee display
function formatFee(fee) {
    if (fee === 0 || fee === '0.00') {
        return '<span class="no-charge">No charge</span>';
    }
    if (typeof fee === 'string') {
        return fee;
    }
    return `R${fee.toFixed(2)}`;
}

// Show error message
function showError(message) {
    const content = document.getElementById('content');
    content.innerHTML = `
        <div class="error">
            <h3>Error</h3>
            <p>${message}</p>
        </div>
    `;
}
