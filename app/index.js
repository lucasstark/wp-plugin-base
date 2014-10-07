var yeoman = require('yeoman-generator');

module.exports = yeoman.generators.Base.extend({

    /**
     * Let's do this!
     */
    constructor: function() {

        // super
        yeoman.generators.Base.apply(this, arguments);
    },

    /**
     * Asks the user questions.
     *
     * https://github.com/SBoudrias/Inquirer.js
     */
    promptTask: function() {
        var done = this.async();

        //TODO: decouple the questions.
        this.prompt([
            {
                type: 'input',
                name: 'name',
                message: 'What is your plugin name?',
                default: this.appname,

                /**
                 * Strip out non-alpha chars except dash and uppercase the name.
                 *
                 * @param answer
                 * @returns {*|XML|string|void}
                 */
                filter: function(answer) {

                    // spaces to underscores
                    answer = answer.replace(/\s/g, '-');

                    // non-alpha removal (except dash)
                    answer = answer.replace(/[^\w-]/g, '');

                    return answer;
                }
            },
            {
                type: 'input',
                name: 'uri',
                message: 'What is your plugin URI?',
                default: '#'
            },
            {
                type: 'input',
                name: 'description',
                message: 'What is your plugin description?',
                default: 'Wordpress Plugin.'
            },
            {
                type: 'input',
                name: 'version',
                message: 'What is your plugin version?',
                default: '0.0.1',
                validation: function(version) {
                    return version;
                }
            },
            {
                type: 'input',
                name: 'author',
                message: 'Who is the author?',
                default: 'Lucas Stark'
            },
            {
                type: 'input',
                name: 'author_uri',
                message: 'What is the author\'s URI?',
                default: '0.0.1'
            },
            {
                type: 'input',
                name: 'license',
                message: 'What is the license?',
                default: 'GPLv2'
            },
            {
                type: 'checkbox',
                name: 'features',
                message: 'What features would you like installed?',
                choices: [
                    { name: 'Sass with Compass', checked: true, value: 'sass' },
                    { name: 'Grunt', checked: true, value: 'grunt' }
                ]
            }
        ], function(answers) {
            this.name = answers.name;
            this.uri = answers.uri;
            this.description = answers.description;
            this.version = answers.version;
            this.author = answers.author;
            this.author_uri = answers.author_uri;
            this.license = answers.license;
            this.features = answers.features;

            // get abbreviation
            this.name_abbr = '';

            var splitName = this.name.split('-');
            for (var i = 0, l = splitName.length; i < l; i++)
                this.name_abbr += splitName[i][0];

            done();
        }.bind(this));
    },

    /**
     * Creates config files.
     */
    configTask: function() {
        //this.sourceRoot(this.name.toLowerCase());
        this.destinationRoot(this.name.toLowerCase());
        this.config.save();
    },

    /**
     * Install dependencies.
     */
    dependencyInstall: function() {
        var done = this.async();

        //this.npmInstall(this.features, { saveDev: true }, done);
    },

    /**
     * Creates the template dirs.
     */
    dirTask: function() {
        var nameLower = this.name.toLowerCase();

        this.mkdir('inc/models');
        this.mkdir('inc/controllers/views/main');
    },

    /**
     * Creates the necessary files for the plugin.
     */
    templatesTask: function() {
        var context = {
            name: this.name,
            name_upper: this.name.toUpperCase(),
            name_lower: this.name.toLowerCase(),
            name_abbr: this.name_abbr,
            name_abbr_upper: this.name_abbr.toUpperCase(),
            name_abbr_lower: this.name_abbr.toLowerCase(),
            uri: this.uri,
            description: this.description,
            version: this.version,
            author: this.author,
            author_uri: this.author_uri,
            license: this.license,
            features: this.features
        };

        // root
        this.template('_main.template', context.name_lower + '.php', context, []);

        // inc root
        this.template('inc/_env.template', 'inc/class-' + context.name_abbr_lower + '-env.php', context, []);
        this.template('inc/_items-table.template', 'inc/class-' + context.name_abbr_lower + '-items-table.php', context, []);
        this.template('inc/_messages.template', 'inc/class-' + context.name_abbr_lower + '-messages.php', context, []);
        this.template('inc/_taxonomy.template', 'inc/class-' + context.name_abbr_lower + '-taxonomy.php', context, []);

        // models root
        this.template('inc/models/_file.template', 'inc/models/' + context.name_abbr_lower + '-file.php', context, []);
        this.template('inc/models/_folder.template', 'inc/models/' + context.name_abbr_lower + '-folder.php', context, []);
        this.template('inc/models/_item.template', 'inc/models/' + context.name_abbr_lower + '-item.php', context, []);

        // controllers root
        this.template('inc/controllers/_admin-controller.template', 'inc/controllers/class-' + context.name_abbr_lower + '-admin-controller.php', context, []);
        this.template('inc/controllers/_controller.template', 'inc/controllers/class-' + context.name_abbr_lower + '-controller.php', context, []);

        // controllers/views root

        // controllers/views/main root
        this.template('inc/controllers/views/main/_index.template', 'inc/controllers/views/main/index.php', context, []);
        this.template('inc/controllers/views/main/_settings.template', 'inc/controllers/views/main/settings.php', context, []);
    }
});