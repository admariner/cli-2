import {Command} from 'commander';
import {green} from 'chalk';
import {Lib as CliModule} from '../lib/index';

import {UnknownCommand} from './commands/unknown.command';
import {DocsCommand} from './commands/docs.command';
import {UpdateCommand} from './commands/update.command';
import {HelpCommand} from './commands/help.command';
import {GoogleCommand} from './commands/google.command';
import {GoogleListCommand} from './commands/google-list.command';
import {GoogleConnectCommand} from './commands/google-connect.command';
import {GoogleDisconnectCommand} from './commands/google-disconnect.command';
import {GoogleActiveCommand} from './commands/google-active.command';
import {NewCommand} from './commands/new.command';
import {ProjectCommand} from './commands/project.command';
import {ProjectSetupCommand} from './commands/project-setup.command';
import {ProjectConfigsCommand} from './commands/project-configs.command';
import {ProjectUrlsCommand} from './commands/project-urls.command';
import {ProjectUrlCommand} from './commands/project-url.command';
import {ProjectInfoCommand} from './commands/project-info.command';
import {ProjectLintCommand} from './commands/project-lint.command';
import {ProjectTestCommand} from './commands/project-test.command';
import {ProjectBuildCommand} from './commands/project-build.command';
import {ProjectPreviewCommand} from './commands/project-preview.command';
import {ProjectDeployCommand} from './commands/project-deploy.command';
import {ConfigCommand} from './commands/config.command';
import {ConfigListCommand} from './commands/config-list.command';
import {ConfigUpdateCommand} from './commands/config-update.command';
import {ConfigImportCommand} from './commands/config-import.command';
import {ConfigExportCommand} from './commands/config-export.command';
import {BackendCommand} from './commands/backend.command';
import {BackendLintCommand} from './commands/backend-lint.command';
import {BackendTestCommand} from './commands/backend-test.command';
import {BackendBuildCommand} from './commands/backend-build.command';
import {BackendPushCommand} from './commands/backend-push.command';
import {BackendDeployCommand} from './commands/backend-deploy.command';
import {BackendInstallCommand} from './commands/backend-install.command';
import {BackendUninstallCommand} from './commands/backend-uninstall.command';
import {BackendRunCommand} from './commands/backend-run.command';
import {FrontendCommand} from './commands/frontend.command';
import {FrontendLintCommand} from './commands/frontend-lint.command';
import {FrontendTestCommand} from './commands/frontend-test.command';
import {FrontendBuildCommand} from './commands/frontend-build.command';
import {FrontendPrerenderCommand} from './commands/frontend-prerender.command';
import {FrontendDeployCommand} from './commands/frontend-deploy.command';
import {FrontendInstallCommand} from './commands/frontend-install.command';
import {FrontendUninstallCommand} from './commands/frontend-uninstall.command';
import {FrontendRunCommand} from './commands/frontend-run.command';
import {DatabaseCommand} from './commands/database.command';
import {DatabaseListCommand} from './commands/database-list.command';
import {DatabaseCreateCommand} from './commands/database-create.command';
import {DatabaseImportCommand} from './commands/database-import.command';
import {DatabaseExportCommand} from './commands/database-export.command';

export class Cli {
  private version: string;
  private cliModule: CliModule;
  unknownCommand: UnknownCommand;
  docsCommand: DocsCommand;
  updateCommand: UpdateCommand;
  helpCommand: HelpCommand;
  googleCommand: GoogleCommand;
  googleListCommand: GoogleListCommand;
  googleConnectCommand: GoogleConnectCommand;
  googleDisconnectCommand: GoogleDisconnectCommand;
  googleActiveCommand: GoogleActiveCommand;
  newCommand: NewCommand;
  projectCommand: ProjectCommand;
  projectSetupCommand: ProjectSetupCommand;
  projectConfigsCommand: ProjectConfigsCommand;
  projectUrlsCommand: ProjectUrlsCommand;
  projectUrlCommand: ProjectUrlCommand;
  projectInfoCommand: ProjectInfoCommand;
  projectLintCommand: ProjectLintCommand;
  projectTestCommand: ProjectTestCommand;
  projectBuildCommand: ProjectBuildCommand;
  projectPreviewCommand: ProjectPreviewCommand;
  projectDeployCommand: ProjectDeployCommand;
  configCommand: ConfigCommand;
  configListCommand: ConfigListCommand;
  configUpdateCommand: ConfigUpdateCommand;
  configImportCommand: ConfigImportCommand;
  configExportCommand: ConfigExportCommand;
  backendCommand: BackendCommand;
  backendLintCommand: BackendLintCommand;
  backendTestCommand: BackendTestCommand;
  backendBuildCommand: BackendBuildCommand;
  backendPushCommand: BackendPushCommand;
  backendDeployCommand: BackendDeployCommand;
  backendInstallCommand: BackendInstallCommand;
  backendUninstallCommand: BackendUninstallCommand;
  backendRunCommand: BackendRunCommand;
  frontendCommand: FrontendCommand;
  frontendLintCommand: FrontendLintCommand;
  frontendTestCommand: FrontendTestCommand;
  frontendBuildCommand: FrontendBuildCommand;
  frontendPrerenderCommand: FrontendPrerenderCommand;
  frontendDeployCommand: FrontendDeployCommand;
  frontendInstallCommand: FrontendInstallCommand;
  frontendUninstallCommand: FrontendUninstallCommand;
  frontendRunCommand: FrontendRunCommand;
  databaseCommand: DatabaseCommand;
  databaseListCommand: DatabaseListCommand;
  databaseCreateCommand: DatabaseCreateCommand;
  databaseImportCommand: DatabaseImportCommand;
  databaseExportCommand: DatabaseExportCommand;

  commander = ['sheetbase', 'Official CLI for working with Sheetbase.'];

  unknownCommandDef: CommandDef = [
    '*',
    'Any other command will run: `npm run <cmd>`.',
  ];

  docsCommandDef: CommandDef = ['docs', 'Open documentation.'];

  updateCommandDef: CommandDef = [
    ['update', 'upgrade', 'up'],
    'Update the CLI to the latest version.',
    ['-y, --yes', 'Do update now.'],
    ['-s, --self', 'Update the CLI itself.'],
  ];

  helpCommandDef: CommandDef = [
    ['help', 'usage', 'he'],
    'Display help.',
    ['-d, --detail', 'Show detail help.'],
  ];

  /**
   * @param subCommand? - Supported sub-command.
   * @param params...? - Params for sub-command.
   */
  googleCommandDef: CommandDef = [
    ['google [subCommand] [params...]', 'gg'],
    'Manage Google accounts.',
    ['-y, --yes', '(connect) Agree on account connection.'],
    ['-c, --creds', '(connect) Save credential to .googlerc.json.'],
    ['-f, --full-drive', '(connect) Not recommended, full access to Drive.'],
  ];

  googleListCommandDef: CommandDef = [
    'google-list',
    'List connected accounts.',
  ];

  googleConnectCommandDef: CommandDef = [
    'google-connect',
    'Connect an account.',
    ['-y, --yes', 'Agree on account connection.'],
    ['-c, --creds', 'Save credential to .googlerc.json.'],
    ['-f, --full-drive', 'Not recommended, full access to Drive.'],
  ];

  /**
   * @param input - Disconnection input: {id}, all, active, local.
   */
  googleDisconnectCommandDef: CommandDef = [
    'google-disconnect <input>',
    'Disconnect an account.',
  ];

  /**
   * @param id - The Google account id.
   */
  googleActiveCommandDef: CommandDef = [
    'google-active <id>',
    'Change the active account.',
  ];

  /**
   * @param name - The project name.
   * @param source? - The custom source.
   */
  newCommandDef: CommandDef = [
    ['new <name> [source]', 'start', 'n'],
    'Star a new project.',
    ['-i, --skip-install', 'Skip installing npm packages.'],
    ['-s, --skip-setup', 'Skip project setup.'],
  ];

  /**
   * @param subCommand? - Supported sub-command.
   * @param params...? - Params for sub-command.
   */
  projectCommandDef: CommandDef = [
    ['project [subCommand] [params...]', 'p'],
    'Project related tasks.',
    ['-r, --fresh', '(setup) Force re-setup.'],
    ['-o, --open', '(url) Open the url in browser.'],
  ];

  projectSetupCommandDef: CommandDef = [
    'project-setup',
    'Setup the project.',
    ['-r, --fresh', 'Force re-setup.'],
  ];

  projectConfigsCommandDef: CommandDef = [
    'project-configs',
    'View project configs.',
  ];

  projectUrlsCommandDef: CommandDef = ['project-urls', 'View project URLs.'];

  projectUrlCommandDef: CommandDef = [
    'project-url <name>',
    'View or open a project URL.',
    ['-o, --open', 'Open the url in browser.'],
  ];

  projectInfoCommandDef: CommandDef = ['project-info', 'Output project info.'];

  projectLintCommandDef: CommandDef = ['project-lint', 'Run linting.'];

  projectTestCommandDef: CommandDef = ['project-test', 'Run testing.'];

  projectBuildCommandDef: CommandDef = ['project-build', 'Build the project.'];

  projectPreviewCommandDef: CommandDef = [
    'project-preview',
    'Preview the project.',
  ];

  projectDeployCommandDef: CommandDef = [
    'project-deploy',
    'Deploy the project.',
  ];

  /**
   * @param subCommand? - Supported sub-command.
   * @param params...? - Params for sub-command.
   */
  configCommandDef: CommandDef = [
    ['config [subCommand] [params...]', 'c'],
    'Config the project.',
  ];

  configListCommandDef: CommandDef = ['config-list', 'Command description.'];

  configUpdateCommandDef: CommandDef = [
    'config-update',
    'Command description.',
  ];

  configImportCommandDef: CommandDef = [
    'config-import',
    'Command description.',
  ];

  configExportCommandDef: CommandDef = [
    'config-export',
    'Command description.',
  ];

  /**
   * @param subCommand? - Supported sub-command.
   * @param params...? - Params for sub-command.
   */
  backendCommandDef: CommandDef = [
    ['backend [subCommand] [params...]', 'b'],
    'Backend related tasks.',
  ];

  backendLintCommandDef: CommandDef = ['backend-lint', 'Command description.'];

  backendTestCommandDef: CommandDef = ['backend-test', 'Command description.'];

  backendBuildCommandDef: CommandDef = [
    'backend-build',
    'Command description.',
  ];

  backendPushCommandDef: CommandDef = ['backend-push', 'Command description.'];

  backendDeployCommandDef: CommandDef = [
    'backend-deploy',
    'Command description.',
  ];

  backendInstallCommandDef: CommandDef = [
    'backend-install',
    'Command description.',
  ];

  backendUninstallCommandDef: CommandDef = [
    'backend-uninstall',
    'Command description.',
  ];

  backendRunCommandDef: CommandDef = ['backend-run', 'Command description.'];

  /**
   * @param subCommand? - Supported sub-command.
   * @param params...? - Params for sub-command.
   */
  frontendCommandDef: CommandDef = [
    ['frontend [subCommand] [params...]', 'f'],
    'Frontend related tasks.',
  ];

  frontendLintCommandDef: CommandDef = [
    'frontend-lint',
    'Command description.',
  ];

  frontendTestCommandDef: CommandDef = [
    'frontend-test',
    'Command description.',
  ];

  frontendBuildCommandDef: CommandDef = [
    'frontend-build',
    'Command description.',
  ];

  frontendPrerenderCommandDef: CommandDef = [
    'frontend-prerender',
    'Command description.',
  ];

  frontendDeployCommandDef: CommandDef = [
    'frontend-deploy',
    'Command description.',
  ];

  frontendInstallCommandDef: CommandDef = [
    'frontend-install',
    'Command description.',
  ];

  frontendUninstallCommandDef: CommandDef = [
    'frontend-uninstall',
    'Command description.',
  ];

  frontendRunCommandDef: CommandDef = ['frontend-run', 'Command description.'];

  /**
   * @param subCommand? - Supported sub-command.
   * @param params...? - Params for sub-command.
   */
  databaseCommandDef: CommandDef = [
    ['database [subCommand] [params...]', 'db'],
    'Manage the database.',
    ['-i, --id [value]', 'Custom database id.'],
    ['-d, --data', 'Create table with sample data.'],
  ];

  databaseListCommandDef: CommandDef = [
    'database-list',
    'Command description.',
  ];

  databaseCreateCommandDef: CommandDef = [
    'database-create',
    'Command description.',
  ];

  databaseImportCommandDef: CommandDef = [
    'database-import',
    'Command description.',
  ];

  databaseExportCommandDef: CommandDef = [
    'database-export',
    'Command description.',
  ];

  constructor() {
    this.version = require('../../package.json').version;
    this.cliModule = new CliModule();
    this.unknownCommand = new UnknownCommand(this.cliModule.terminalService);
    this.docsCommand = new DocsCommand(this.cliModule.messageService);
    this.updateCommand = new UpdateCommand(this.cliModule.terminalService);
    this.helpCommand = new HelpCommand(this.cliModule.helpService);
    this.googleListCommand = new GoogleListCommand(
      this.cliModule.helperService,
      this.cliModule.messageService,
      this.cliModule.googleService
    );
    this.googleConnectCommand = new GoogleConnectCommand();
    this.googleDisconnectCommand = new GoogleDisconnectCommand();
    this.googleActiveCommand = new GoogleActiveCommand();
    this.googleCommand = new GoogleCommand(
      this.cliModule.helpService,
      this.cliModule.messageService,
      this.googleListCommand,
      this.googleConnectCommand,
      this.googleDisconnectCommand,
      this.googleActiveCommand
    );
    this.newCommand = new NewCommand();
    this.projectCommand = new ProjectCommand();
    this.projectSetupCommand = new ProjectSetupCommand();
    this.projectConfigsCommand = new ProjectConfigsCommand();
    this.projectUrlsCommand = new ProjectUrlsCommand();
    this.projectUrlCommand = new ProjectUrlCommand();
    this.projectInfoCommand = new ProjectInfoCommand();
    this.projectLintCommand = new ProjectLintCommand();
    this.projectTestCommand = new ProjectTestCommand();
    this.projectBuildCommand = new ProjectBuildCommand();
    this.projectPreviewCommand = new ProjectPreviewCommand();
    this.projectDeployCommand = new ProjectDeployCommand();
    this.configCommand = new ConfigCommand();
    this.configListCommand = new ConfigListCommand();
    this.configUpdateCommand = new ConfigUpdateCommand();
    this.configImportCommand = new ConfigImportCommand();
    this.configExportCommand = new ConfigExportCommand();
    this.backendCommand = new BackendCommand();
    this.backendLintCommand = new BackendLintCommand();
    this.backendTestCommand = new BackendTestCommand();
    this.backendBuildCommand = new BackendBuildCommand();
    this.backendPushCommand = new BackendPushCommand();
    this.backendDeployCommand = new BackendDeployCommand();
    this.backendInstallCommand = new BackendInstallCommand();
    this.backendUninstallCommand = new BackendUninstallCommand();
    this.backendRunCommand = new BackendRunCommand();
    this.frontendCommand = new FrontendCommand();
    this.frontendLintCommand = new FrontendLintCommand();
    this.frontendTestCommand = new FrontendTestCommand();
    this.frontendBuildCommand = new FrontendBuildCommand();
    this.frontendPrerenderCommand = new FrontendPrerenderCommand();
    this.frontendDeployCommand = new FrontendDeployCommand();
    this.frontendInstallCommand = new FrontendInstallCommand();
    this.frontendUninstallCommand = new FrontendUninstallCommand();
    this.frontendRunCommand = new FrontendRunCommand();
    this.databaseCommand = new DatabaseCommand();
    this.databaseListCommand = new DatabaseListCommand();
    this.databaseCreateCommand = new DatabaseCreateCommand();
    this.databaseImportCommand = new DatabaseImportCommand();
    this.databaseExportCommand = new DatabaseExportCommand();
  }

  getApp() {
    const commander = new Command();

    // general
    const [command, description] = this.commander;
    commander
      .version(this.version, '-v, --version')
      .name(`${command}`)
      .usage('[options] [command]')
      .description(description);

    // docs
    (() => {
      const [command, description] = this.docsCommandDef;
      commander
        .command(command as string)
        .description(description)
        .action(() => this.docsCommand.run());
    })();

    // update
    (() => {
      const [
        [command, ...aliases],
        description,
        yesOpt,
        depsOpt,
      ] = this.updateCommandDef;
      commander
        .command(command)
        .aliases(aliases)
        .description(description)
        .option(...yesOpt)
        .option(...depsOpt)
        .action(options => this.updateCommand.run(this.version, options));
    })();

    // google
    (() => {
      const [
        [command, ...aliases],
        description,
        yesOpt,
        credsOpt,
        fullDriveOpt,
      ] = this.googleCommandDef;
      commander
        .command(command)
        .aliases(aliases)
        .description(description)
        .option(...yesOpt)
        .option(...credsOpt)
        .option(...fullDriveOpt)
        .action((subCommand, params, options) =>
          this.googleCommand.run(subCommand, params, options)
        );
    })();

    // google-list
    (() => {
      const [command, description] = this.googleListCommandDef;
      commander
        .command(command as string)
        .description(description)
        .action(() => this.googleListCommand.run());
    })();

    // google-connect
    (() => {
      const [
        command,
        description,
        yesOpt,
        credsOpt,
        fullDriveOpt,
      ] = this.googleConnectCommandDef;
      commander
        .command(command as string)
        .description(description)
        .option(...yesOpt)
        .option(...credsOpt)
        .option(...fullDriveOpt)
        .action(options => this.googleConnectCommand.run(options));
    })();

    // google-disconnect
    (() => {
      const [command, description] = this.googleDisconnectCommandDef;
      commander
        .command(command as string)
        .description(description)
        .action(input => this.googleDisconnectCommand.run(input));
    })();

    // google-active
    (() => {
      const [command, description] = this.googleActiveCommandDef;
      commander
        .command(command as string)
        .description(description)
        .action(id => this.googleActiveCommand.run(id));
    })();

    // new
    (() => {
      const [[command, ...aliases], description] = this.newCommandDef;
      commander
        .command(command)
        .aliases(aliases)
        .description(description)
        .action((name, source, options) =>
          this.newCommand.run(name, source, options)
        );
    })();

    // project
    (() => {
      const [[command, ...aliases], description] = this.projectCommandDef;
      commander
        .command(command)
        .aliases(aliases)
        .description(description)
        .action((subCommand, params, options) =>
          this.projectCommand.run(subCommand, params, options)
        );
    })();

    // project-setup
    (() => {
      const [command, description] = this.projectSetupCommandDef;
      commander
        .command(command as string)
        .description(description)
        .action(options => this.projectSetupCommand.run(options));
    })();

    // project-configs
    (() => {
      const [command, description] = this.projectConfigsCommandDef;
      commander
        .command(command as string)
        .description(description)
        .action(() => this.projectConfigsCommand.run());
    })();

    // project-urls
    (() => {
      const [command, description] = this.projectUrlsCommandDef;
      commander
        .command(command as string)
        .description(description)
        .action(() => this.projectUrlsCommand.run());
    })();

    // project-url
    (() => {
      const [command, description] = this.projectUrlCommandDef;
      commander
        .command(command as string)
        .description(description)
        .action(options => this.projectUrlCommand.run(options));
    })();

    // project-info
    (() => {
      const [command, description] = this.projectInfoCommandDef;
      commander
        .command(command as string)
        .description(description)
        .action(() => this.projectInfoCommand.run());
    })();

    // project-lint
    (() => {
      const [command, description] = this.projectLintCommandDef;
      commander
        .command(command as string)
        .description(description)
        .action(() => this.projectLintCommand.run());
    })();

    // project-test
    (() => {
      const [command, description] = this.projectTestCommandDef;
      commander
        .command(command as string)
        .description(description)
        .action(() => this.projectTestCommand.run());
    })();

    // project-build
    (() => {
      const [command, description] = this.projectBuildCommandDef;
      commander
        .command(command as string)
        .description(description)
        .action(() => this.projectBuildCommand.run());
    })();

    // project-preview
    (() => {
      const [command, description] = this.projectPreviewCommandDef;
      commander
        .command(command as string)
        .description(description)
        .action(() => this.projectPreviewCommand.run());
    })();

    // project-deploy
    (() => {
      const [command, description] = this.projectDeployCommandDef;
      commander
        .command(command as string)
        .description(description)
        .action(() => this.projectDeployCommand.run());
    })();

    // config
    (() => {
      const [[command, ...aliases], description] = this.configCommandDef;
      commander
        .command(command)
        .aliases(aliases)
        .description(description)
        .action((subCommand, params) =>
          this.configCommand.run(subCommand, params)
        );
    })();

    // config-list
    (() => {
      const [command, description] = this.configListCommandDef;
      commander
        .command(command as string)
        .description(description)
        .action(() => this.configListCommand.run());
    })();

    // config-update
    (() => {
      const [command, description] = this.configUpdateCommandDef;
      commander
        .command(command as string)
        .description(description)
        .action(() => this.configUpdateCommand.run());
    })();

    // config-import
    (() => {
      const [command, description] = this.configImportCommandDef;
      commander
        .command(command as string)
        .description(description)
        .action(() => this.configImportCommand.run());
    })();

    // config-export
    (() => {
      const [command, description] = this.configExportCommandDef;
      commander
        .command(command as string)
        .description(description)
        .action(() => this.configExportCommand.run());
    })();

    // backend
    (() => {
      const [[command, ...aliases], description] = this.backendCommandDef;
      commander
        .command(command)
        .aliases(aliases)
        .description(description)
        .action((subCommand, params) =>
          this.backendCommand.run(subCommand, params)
        );
    })();

    // backend-lint
    (() => {
      const [command, description] = this.backendLintCommandDef;
      commander
        .command(command as string)
        .description(description)
        .action(() => this.backendLintCommand.run());
    })();

    // backend-test
    (() => {
      const [command, description] = this.backendTestCommandDef;
      commander
        .command(command as string)
        .description(description)
        .action(() => this.backendTestCommand.run());
    })();

    // backend-build
    (() => {
      const [command, description] = this.backendBuildCommandDef;
      commander
        .command(command as string)
        .description(description)
        .action(() => this.backendBuildCommand.run());
    })();

    // backend-push
    (() => {
      const [command, description] = this.backendPushCommandDef;
      commander
        .command(command as string)
        .description(description)
        .action(() => this.backendPushCommand.run());
    })();

    // backend-deploy
    (() => {
      const [command, description] = this.backendDeployCommandDef;
      commander
        .command(command as string)
        .description(description)
        .action(() => this.backendDeployCommand.run());
    })();

    // backend-install
    (() => {
      const [command, description] = this.backendInstallCommandDef;
      commander
        .command(command as string)
        .description(description)
        .action(() => this.backendInstallCommand.run());
    })();

    // backend-uninstall
    (() => {
      const [command, description] = this.backendUninstallCommandDef;
      commander
        .command(command as string)
        .description(description)
        .action(() => this.backendUninstallCommand.run());
    })();

    // backend-run
    (() => {
      const [command, description] = this.backendRunCommandDef;
      commander
        .command(command as string)
        .description(description)
        .action(() => this.backendRunCommand.run());
    })();

    // frontend
    (() => {
      const [[command, ...aliases], description] = this.frontendCommandDef;
      commander
        .command(command)
        .aliases(aliases)
        .description(description)
        .action((subCommand, params) =>
          this.frontendCommand.run(subCommand, params)
        );
    })();

    // frontend-lint
    (() => {
      const [command, description] = this.frontendLintCommandDef;
      commander
        .command(command as string)
        .description(description)
        .action(() => this.frontendLintCommand.run());
    })();

    // frontend-test
    (() => {
      const [command, description] = this.frontendTestCommandDef;
      commander
        .command(command as string)
        .description(description)
        .action(() => this.frontendTestCommand.run());
    })();

    // frontend-build
    (() => {
      const [command, description] = this.frontendBuildCommandDef;
      commander
        .command(command as string)
        .description(description)
        .action(() => this.frontendBuildCommand.run());
    })();

    // frontend-prerender
    (() => {
      const [command, description] = this.frontendPrerenderCommandDef;
      commander
        .command(command as string)
        .description(description)
        .action(() => this.frontendPrerenderCommand.run());
    })();

    // frontend-deploy
    (() => {
      const [command, description] = this.frontendDeployCommandDef;
      commander
        .command(command as string)
        .description(description)
        .action(() => this.frontendDeployCommand.run());
    })();

    // frontend-install
    (() => {
      const [command, description] = this.frontendInstallCommandDef;
      commander
        .command(command as string)
        .description(description)
        .action(() => this.frontendInstallCommand.run());
    })();

    // frontend-uninstall
    (() => {
      const [command, description] = this.frontendUninstallCommandDef;
      commander
        .command(command as string)
        .description(description)
        .action(() => this.frontendUninstallCommand.run());
    })();

    // frontend-run
    (() => {
      const [command, description] = this.frontendRunCommandDef;
      commander
        .command(command as string)
        .description(description)
        .action(() => this.frontendRunCommand.run());
    })();

    // database
    (() => {
      const [[command, ...aliases], description] = this.databaseCommandDef;
      commander
        .command(command)
        .aliases(aliases)
        .description(description)
        .action((subCommand, params, options) =>
          this.databaseCommand.run(subCommand, params, options)
        );
    })();

    // database-list
    (() => {
      const [command, description] = this.databaseListCommandDef;
      commander
        .command(command as string)
        .description(description)
        .action(() => this.databaseListCommand.run());
    })();

    // database-create
    (() => {
      const [command, description] = this.databaseCreateCommandDef;
      commander
        .command(command as string)
        .description(description)
        .action(() => this.databaseCreateCommand.run());
    })();

    // database-import
    (() => {
      const [command, description] = this.databaseImportCommandDef;
      commander
        .command(command as string)
        .description(description)
        .action(() => this.databaseImportCommand.run());
    })();

    // database-export
    (() => {
      const [command, description] = this.databaseExportCommandDef;
      commander
        .command(command as string)
        .description(description)
        .action(() => this.databaseExportCommand.run());
    })();

    // help
    (() => {
      const [
        [command, ...aliases],
        description,
        detailOpt,
      ] = this.helpCommandDef;
      commander
        .command(command)
        .aliases(aliases)
        .description(description)
        .option(...detailOpt)
        .action(options => this.helpCommand.run(this.version, options));
      commander.on('--help', () => {
        console.log('');
        console.log('Show help:');
        console.log('  $ ' + green('sheetbase help|h'));
      });
    })();

    // *
    (() => {
      const [command, description] = this.unknownCommandDef;
      commander
        .command(command as string)
        .description(description)
        .action(cmd => this.unknownCommand.run(cmd.args[0]));
    })();

    // updating
    if (process.argv.slice(2)[0] !== 'update') {
      this.updateCommand.checkUpdate(this.version);
    }

    return commander;
  }
}

type CommandDef = [string | string[], string, ...Array<[string, string]>];
