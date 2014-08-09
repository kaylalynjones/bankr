db.transfers.find().snapshot().forEach(
    function(tr) {
        tr.date = new Date(tr.date);
        db.transfers.save(tr);
    });

db.transactions.find().snapshot().forEach(
    function(tr) {
        tr.date = new Date(tr.date);
        db.transactions.save(tr);
    });

