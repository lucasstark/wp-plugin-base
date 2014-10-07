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
                default: this.appname
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
                default: '0.0.1'
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
                default: 'http://lucasstark.com'
            },
            {
                type: 'input',
                name: 'license',
                message: 'What is the license?',
                default: 'GPLv2'
            }
        ], function(answers) {
            this.name = answers.name;
            this.slug = this._.slugify(this.name);
            this.uri = answers.uri;
            this.description = answers.description;
            this.version = answers.version;
            this.author = answers.author;
            this.author_uri = answers.author_uri;
            this.license = answers.license;

            // get abbreviation
            this.name_abbr = '';

            var splitName = this.name.split('-');
            for (var i = 0, l = splitName.length; i < l; i++)
                this.name_abbr += splitName[i][0];

            done();
        }.bind(this));
    },

    /**
     * Configuration.
     */
    configTask: function() {
        this.destinationRoot(this.slug.toLowerCase());
    },

    /**
     * Creates the template dirs.
     */
    dirTask: function() {
        this.destinationRoot(this.slug.toLowerCase());
        this.mkdir('inc/models');
        this.mkdir('inc/controllers/views/main');
    },

    /**
     * Creates the necessary files for the plugin.
     */
    templatesTask: function() {
        var options = [],
            context = {
                name: this.name,
                name_upper: this.name.toUpperCase(),
                name_lower: this.name.toLowerCase(),
                name_abbr: this.name_abbr,
                name_abbr_upper: this.name_abbr.toUpperCase(),
                name_abbr_lower: this.name_abbr.toLowerCase(),
                slug: this.slug,
                uri: this.uri,
                description: this.description,
                version: this.version,
                author: this.author,
                author_uri: this.author_uri,
                license: this.license,
                features: this.features
            };

        // root
        this.template('_main.template', context.slug + '.php', context, options);
        this.template('_readme.md', 'readme.md', context, options);
        this.template('_contributing.md', 'contributing.md', context, options);
        this.template('_.gitignore', '.gitignore', context, options);
        this.template('_.gitattributes', '.gitattributes', context, options);
        this.template('_.editorconfig', '.editorconfig', context, options);
        this.template('_Gruntfile.js', 'Gruntfile.js', context, options);
        this.template('_package.json', 'package.json', context, options);
        this.template('_.bowerrc', '.bowerrc', context, options);
        this.template('_bower.json', 'bower.json', context, options);

        // inc root
        this.template('inc/_env.template', 'inc/class-' + context.name_abbr_lower + '-env.php', context, options);
        this.template('inc/_items-table.template', 'inc/class-' + context.name_abbr_lower + '-items-table.php', context, options);
        this.template('inc/_messages.template', 'inc/class-' + context.name_abbr_lower + '-messages.php', context, options);
        this.template('inc/_taxonomy.template', 'inc/class-' + context.name_abbr_lower + '-taxonomy.php', context, options);

        // models root
        this.template('inc/models/_file.template', 'inc/models/' + context.name_abbr_lower + '-file.php', context, options);
        this.template('inc/models/_folder.template', 'inc/models/' + context.name_abbr_lower + '-folder.php', context, options);
        this.template('inc/models/_item.template', 'inc/models/' + context.name_abbr_lower + '-item.php', context, options);

        // controllers root
        this.template('inc/controllers/_admin-controller.template', 'inc/controllers/class-' + context.name_abbr_lower + '-admin-controller.php', context, options);
        this.template('inc/controllers/_controller.template', 'inc/controllers/class-' + context.name_abbr_lower + '-controller.php', context, options);

        // controllers/views root
        // none

        // controllers/views/main root
        this.template('inc/controllers/views/main/_index.template', 'inc/controllers/views/main/index.php', context, options);
        this.template('inc/controllers/views/main/_settings.template', 'inc/controllers/views/main/settings.php', context, options);
    },

    /**
     * Install dependencies
     */
    dependencyTask: function() {
        this.installDependencies({});
    }
});