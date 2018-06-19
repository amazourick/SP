module.exports = function(sequelize, Sequelize) {
    const EventTypeSchema = sequelize.define('EventType', {
        id: {
            type: Sequelize.INTEGER(20),
            primaryKey: true,
            autoIncrement: true
        },
        name: Sequelize.STRING,
        description: Sequelize.STRING,
        editable: Sequelize.BOOLEAN,

        url: {
            type: Sequelize.STRING,
            allowNull: true,
            get() {
                return '/eventTypes/' + this.getDataValue('id');
            }
        },

        urlUpdate: {
            type: Sequelize.STRING,
            allowNull: true,
            get() {
                return '/eventTypes/' + this.getDataValue('id') + '/update';
            }
        },

        urlDelete: {
            type: Sequelize.STRING,
            allowNull: true,
            get() {
                return '/eventTypes/' + this.getDataValue('id') + '/delete';
            }
        }

    }, {
        timestamp: true,
        paranoid: false
    });

    return EventTypeSchema;
};