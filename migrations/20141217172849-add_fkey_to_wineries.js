"use strict";

module.exports = {
  up: function(migration, DataTypes, done) {
    // add altering commands here, calling 'done' when finished
    migration.addColumn(
    	'wineries',
    	'userId',
    	{
    		type: DataTypes.INTEGER,
    		allowNull: false
    	}

    );
    done();
  },

  down: function(migration, DataTypes, done) {
    // add reverting commands here, calling 'done' when finished
    migration.removeColumn('wineries','userId');
    done();
  }
};
