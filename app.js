// ===== Tab Switching =====
function switchTab(tabName, btn) {
    document.querySelectorAll('.tab-btn').forEach(function(b) { b.classList.remove('active'); });
    btn.classList.add('active');
    showPanel(tabName);
}

function showPanel(panelName) {
    document.querySelectorAll('.calc-panel').forEach(function(p) { p.classList.remove('active'); });
    var panel = document.getElementById('panel-' + panelName);
    if (panel) panel.classList.add('active');
    panel.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// ===== FAQ Toggle =====
function toggleFaq(el) {
    var item = el.parentElement;
    item.classList.toggle('open');
}

// ===== Format Currency =====
function fmt(val) {
    return '$' + Math.round(val).toLocaleString('en-US');
}

// ===== Mortgage Payment Calculation =====
function calcMonthly() {
    var homePrice = parseFloat(document.getElementById('mp-homePrice').value) || 0;
    var downPayment = parseFloat(document.getElementById('mp-downPayment').value) || 0;
    var rate = parseFloat(document.getElementById('mp-interestRate').value) || 0;
    var years = parseInt(document.getElementById('mp-loanTerm').value) || 30;
    var annualTax = parseFloat(document.getElementById('mp-propertyTax').value) || 0;
    var annualIns = parseFloat(document.getElementById('mp-insurance').value) || 0;
    var hoa = parseFloat(document.getElementById('mp-hoa').value) || 0;
    var pmi = parseFloat(document.getElementById('mp-pmi').value) || 0;

    var principal = homePrice - downPayment;
    var r = rate / 100 / 12;
    var n = years * 12;
    var pi;

    if (r === 0) {
        pi = principal / n;
    } else {
        pi = principal * (r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    }

    var monthlyTax = annualTax / 12;
    var monthlyIns = annualIns / 12;
    var total = pi + monthlyTax + monthlyIns + hoa + pmi;

    var results = document.getElementById('mp-results');
    results.classList.add('show');
    document.getElementById('mp-total').textContent = fmt(total);
    document.getElementById('mp-pi').textContent = fmt(pi);
    document.getElementById('mp-tax').textContent = fmt(monthlyTax);
    document.getElementById('mp-ins').textContent = fmt(monthlyIns);
    document.getElementById('mp-hoa-res').textContent = fmt(hoa);
    document.getElementById('mp-pmi-res').textContent = fmt(pmi);

    showAmortization(principal, r, n, pi);
}

function showAmortization(principal, r, n, pi) {
    var section = document.getElementById('amort-section');
    var tbody = document.getElementById('amort-body');
    tbody.innerHTML = '';
    section.style.display = 'block';

    var balance = principal;
    for (var year = 1; year <= Math.ceil(n / 12); year++) {
        var yearInterest = 0;
        var yearPrincipal = 0;
        for (var m = 0; m < 12 && balance > 0; m++) {
            var interestPayment = balance * r;
            var principalPayment = pi - interestPayment;
            if (principalPayment > balance) principalPayment = balance;
            yearInterest += interestPayment;
            yearPrincipal += principalPayment;
            balance -= principalPayment;
        }
        if (balance < 0) balance = 0;
        var row = tbody.insertRow();
        row.innerHTML = '<td>' + year + '</td><td>' + fmt(yearInterest) + '</td><td>' + fmt(yearPrincipal) + '</td><td>' + fmt(balance) + '</td>';
        if (balance === 0) break;
    }
}

// ===== Qualification Calculation =====
function calcQualification() {
    var income = parseFloat(document.getElementById('q-annualIncome').value) || 0;
    var debt = parseFloat(document.getElementById('q-monthlyDebt').value) || 0;
    var downPayment = parseFloat(document.getElementById('q-downPayment').value) || 0;
    var rate = parseFloat(document.getElementById('q-interestRate').value) || 0;
    var years = parseInt(document.getElementById('q-loanTerm').value) || 30;
    var annualTax = parseFloat(document.getElementById('q-propertyTax').value) || 0;
    var annualIns = parseFloat(document.getElementById('q-insurance').value) || 0;

    var monthlyIncome = income / 12;
    var maxHousingPayment = monthlyIncome * 0.28;
    var maxTotalDebt = monthlyIncome * 0.36;
    var availableForMortgage = Math.min(maxHousingPayment, maxTotalDebt - debt);

    if (availableForMortgage < 0) availableForMortgage = 0;

    var r = rate / 100 / 12;
    var n = years * 12;
    var loanAmount;

    if (r === 0) {
        loanAmount = availableForMortgage * n;
    } else {
        loanAmount = availableForMortgage * (Math.pow(1 + r, n) - 1) / (r * Math.pow(1 + r, n));
    }

    var maxHomePrice = loanAmount + downPayment;
    var monthlyTax = annualTax / 12;
    var monthlyIns = annualIns / 12;
    var totalMonthly = availableForMortgage + monthlyTax + monthlyIns;

    var pi;
    if (r === 0) {
        pi = loanAmount / n;
    } else {
        pi = loanAmount * (r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    }

    var dti = income > 0 ? ((totalMonthly) / monthlyIncome * 100) : 0;

    var results = document.getElementById('q-results');
    results.classList.add('show');
    document.getElementById('q-maxHomePrice').textContent = fmt(maxHomePrice);
    document.getElementById('q-loanAmount').textContent = fmt(loanAmount);
    document.getElementById('q-monthlyPI').textContent = fmt(pi);
    document.getElementById('q-totalMonthly').textContent = fmt(totalMonthly);
    document.getElementById('q-dti').textContent = dti.toFixed(1) + '%';
}

// ===== Refinance Calculation =====
function calcRefinance() {
    var balance = parseFloat(document.getElementById('r-currentBalance').value) || 0;
    var currentRate = parseFloat(document.getElementById('r-currentRate').value) || 0;
    var currentYears = parseInt(document.getElementById('r-currentTerm').value) || 30;
    var newRate = parseFloat(document.getElementById('r-newRate').value) || 0;
    var newYears = parseInt(document.getElementById('r-newTerm').value) || 30;
    var closingCosts = parseFloat(document.getElementById('r-closingCosts').value) || 0;

    var rOld = currentRate / 100 / 12;
    var nOld = currentYears * 12;
    var rNew = newRate / 100 / 12;
    var nNew = newYears * 12;

    var oldPI;
    if (rOld === 0) {
        oldPI = balance / nOld;
    } else {
        oldPI = balance * (rOld * Math.pow(1 + rOld, nOld)) / (Math.pow(1 + rOld, nOld) - 1);
    }

    var newPI;
    if (rNew === 0) {
        newPI = balance / nNew;
    } else {
        newPI = balance * (rNew * Math.pow(1 + rNew, nNew)) / (Math.pow(1 + rNew, nNew) - 1);
    }

    var monthlySavings = oldPI - newPI;
    var breakevenMonths = monthlySavings > 0 ? Math.ceil(closingCosts / monthlySavings) : 0;

    var oldTotalInterest = (oldPI * nOld) - balance;
    var newTotalInterest = (newPI * nNew) - balance;
    var totalSavings = oldTotalInterest - newTotalInterest;

    var results = document.getElementById('r-results');
    results.classList.add('show');
    document.getElementById('r-oldPayment').textContent = fmt(oldPI);
    document.getElementById('r-newPayment').textContent = fmt(newPI);
    document.getElementById('r-monthlySavings').textContent = fmt(monthlySavings);
    document.getElementById('r-totalSavings').textContent = fmt(totalSavings);
    document.getElementById('r-breakeven').textContent = breakevenMonths + ' months';
    document.getElementById('r-oldInterest').textContent = fmt(oldTotalInterest);
    document.getElementById('r-newInterest').textContent = fmt(newTotalInterest);
}

// ===== Cash-Out Refinance Calculation =====
function calcCashout() {
    var homeValue = parseFloat(document.getElementById('c-homeValue').value) || 0;
    var currentBalance = parseFloat(document.getElementById('c-currentBalance').value) || 0;
    var currentRate = parseFloat(document.getElementById('c-currentRate').value) || 0;
    var newRate = parseFloat(document.getElementById('c-newRate').value) || 0;
    var newYears = parseInt(document.getElementById('c-newTerm').value) || 30;
    var maxLTV = parseFloat(document.getElementById('c-maxLTV').value) || 0.80;
    var closingCostsPct = parseFloat(document.getElementById('c-closingCostsPct').value) || 0;

    var equity = homeValue - currentBalance;
    var maxLoan = homeValue * maxLTV;
    var closingCosts = maxLoan * (closingCostsPct / 100);
    var cashAvailable = maxLoan - currentBalance - closingCosts;
    if (cashAvailable < 0) cashAvailable = 0;

    var rNew = newRate / 100 / 12;
    var nNew = newYears * 12;
    var newPI;
    if (rNew === 0) {
        newPI = maxLoan / nNew;
    } else {
        newPI = maxLoan * (rNew * Math.pow(1 + rNew, nNew)) / (Math.pow(1 + rNew, nNew) - 1);
    }

    var rOld = currentRate / 100 / 12;
    var nOld = 30 * 12;
    var oldPI;
    if (rOld === 0) {
        oldPI = currentBalance / nOld;
    } else {
        oldPI = currentBalance * (rOld * Math.pow(1 + rOld, nOld)) / (Math.pow(1 + rOld, nOld) - 1);
    }

    var paymentChange = newPI - oldPI;

    var results = document.getElementById('c-results');
    results.classList.add('show');
    document.getElementById('c-equity').textContent = fmt(equity);
    document.getElementById('c-maxLoan').textContent = fmt(maxLoan);
    document.getElementById('c-closingCosts').textContent = fmt(closingCosts);
    document.getElementById('c-cashAvailable').textContent = fmt(cashAvailable);
    document.getElementById('c-newPayment').textContent = fmt(newPI);
    document.getElementById('c-oldPayment').textContent = fmt(oldPI);
    document.getElementById('c-paymentChange').textContent = fmt(paymentChange);
    document.getElementById('c-ltv-display').textContent = Math.round(maxLTV * 100) + '%';
}

// ===== Auto-calculate on input change =====
document.addEventListener('DOMContentLoaded', function() {
    var mpInputs = ['mp-homePrice','mp-downPayment','mp-interestRate','mp-loanTerm','mp-propertyTax','mp-insurance','mp-hoa','mp-pmi'];
    mpInputs.forEach(function(id) {
        var el = document.getElementById(id);
        if (el) el.addEventListener('input', calcMonthly);
    });

    var qInputs = ['q-annualIncome','q-monthlyDebt','q-downPayment','q-interestRate','q-loanTerm','q-propertyTax','q-insurance'];
    qInputs.forEach(function(id) {
        var el = document.getElementById(id);
        if (el) el.addEventListener('input', calcQualification);
    });

    var rInputs = ['r-currentBalance','r-currentRate','r-currentTerm','r-currentMonthly','r-newRate','r-newTerm','r-closingCosts','r-extraPayment'];
    rInputs.forEach(function(id) {
        var el = document.getElementById(id);
        if (el) el.addEventListener('input', calcRefinance);
    });

    var cInputs = ['c-homeValue','c-currentBalance','c-currentRate','c-newRate','c-newTerm','c-maxLTV','c-closingCostsPct'];
    cInputs.forEach(function(id) {
        var el = document.getElementById(id);
        if (el) el.addEventListener('input', calcCashout);
    });
});