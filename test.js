db.accounts.find().snapshot().forEach(
    function (a) {
        a.initDeposit = parseFloat(a.inDeposit.slice(1, a.inDeposit.length));
        a.balance = a.initDeposit;
        delete a.inDeposit;
        // save the updated document
        db.accounts.save(a);
    });
db.transactions.find().snapshot().forEach(
    function(tr) {
        if (tr.fee) {
            tr.fee = parseFloat(tr.fee.slice(1, tr.fee.length));
        }
        if (tr.amount) {
            tr.amount = parseFloat(tr.amount.slice(1, tr.amount.length));
        }
        db.transactions.save(tr);
    });
db.transfers.find().snapshot().forEach(
    function(tr) {
        if (tr.fee) {
            tr.fee = parseFloat(tr.fee.slice(1, tr.fee.length));
        }
        if (tr.amount) {
            tr.amount = parseFloat(tr.amount.slice(1, tr.amount.length));
        }
        db.transfers.save(tr);
    });
