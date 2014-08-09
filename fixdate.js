db.accounts.find().snapshot().forEach(
    function (a) {
      a.dateCreated = new Date(a.dateCreated);
      // save the updated document
      db.accounts.save(a);
    });
