import {EOL} from 'os';
import {green, red, yellow, magenta, blue, gray} from 'chalk';

export class MessageService {
  private ok = `[${green('OK')}]`;
  private error = `[${red('ERROR')}]`;
  private warn = `[${yellow('WARNING')}]`;
  private wait = `[${magenta('WAIT')}]`;
  private info = `[${blue('INFO')}]`;
  private errors = {
    BACKEND__ERROR__INVALID: 'No backend found or invalid.',
    DATABASE__ERROR__NO_DATABASE: 'No database found or invalid.',
    DATABASE__ERROR__NO_TABLE: 'No table name provided for this action.',
    DATABASE_CREATE__ERROR__NO_INPUT:
      'Require at least 1 model input for custom db.',
    DATABASE_IMPORT__ERROR__NO_SOURCE:
      'No data source, it can be a built-in model, a local path or an url.',
    DATABASE_IMPORT__ERROR__NO_DATA: (source: string) =>
      `No data found for the source: ${blue(source)}`,
    GOOGLE__ERROR__NO_ACCOUNT:
      'No Google accounts connected, to connect: ' +
      magenta('sheetbase google connect') +
      ' and try again.',
    FRONTEND_DEPLOY__ERROR__NO_PROVIDER: 'No deployment configs.',
    FRONTEND_DEPLOY__ERROR__NO_STAGING: 'No staging found, please build first.',
    FRONTEND_PRERENDER__ERROR__NO_PRERENDER: 'No prerender configs.',
    GOOGLE_DISCONNECTED__ERROR__NO_VALUE:
      'No value provided, available: ' +
      `${blue('[id]')}|${blue('all')}|${blue('active')}|${blue('local')}`,
    PROJECT__ERROR__INVALID: 'Invalid project, no "sheetbase.json" found.',
    PROJECT__ERROR__EXISTS: 'Project exists, please choose different name.',
    PROJECT_CONFIG_IMPORT__ERROR__NO_FILE: 'No configs file found.',
    PROJECT_MODEL__ERROR__DUPLICATE_GID: (m1: string, m2: string) =>
      `Model ${blue(m1)} has the same GID as ${blue(m2)}`,
    PROJECT_SETUP__ERROR__NO_GOOGLE_ACCOUNT: (name: string) =>
      this.errors['GOOGLE__ERROR__NO_ACCOUNT'] +
      EOL +
      '       + Then: ' +
      magenta('cd ' + name) +
      EOL +
      '       + And: ' +
      magenta('sheetbase setup') +
      EOL +
      '',
    PROJECT_START__ERROR__INVALID_RESOURCE: 'Invalid resource.',
  } as Record<string, string | Function>;

  private logs = {
    APP__INFO__INVALID_SUBCOMMAND: (cmd: string) =>
      `Invalid sub-command for ${magenta(cmd)}, available:`,
    APP__INFO__LINK_OPENED: (link: string) => `Link opened: ${blue(link)}`,
    BACKEND_DEPLOY__OK:
      'To view newly deployed backend: ' + magenta('sheetbase url -o backend'),
    BACKEND_PUSH__OK: (result: {files: Record<string, unknown>[]}) => {
      const {files = []} = result;
      let message = 'Pushed ' + files.length + ' files.';
      files.forEach(file => {
        const type =
          file.type === 'SERVER_JS'
            ? 'js'
            : (file.type as string).toLowerCase();
        message += EOL + '    + ' + file.name + '.' + type;
      });
      return message;
    },
    DATABASE_EXPORT__OK: (path: string) => `Data exported to: ${blue(path)}`,
    DATABASE_IMPORT__OK: (tableName: string, source: string) =>
      `Data imported to ${blue(tableName)} from source ${blue(source)}`,
    FRONTEND_BUILD__OK:
      'To re-deploy the frontend: ' + magenta('sheetbase frontend deploy'),
    FRONTEND_DEPLOY__OK: (url: string) =>
      `Frontend deployed. View: ${blue(url)}`,
    FRONTEND_PRERENDER__OK: 'Prerender completed.',
    GOOGLE_CONNECT__WARN__CREDS:
      'File ' +
      blue('.googlerc.json') +
      `saved, please keep the file ${red('SECRET')}.`,
    GOOGLE_CONNECT__OK:
      'Account connected, see list: ' + magenta('sheetbase google list'),
    GOOGLE_DEFAULT__OK: (id: string) =>
      `Default acccount changed to ${blue(id)}, for detail: ` +
      magenta('sheetbase google list -d'),
    GOOGLE_DISCONNECTED__OK:
      'You may also want to remove Sheetbase from: ' +
      blue('https://myaccount.google.com/permissions'),
    GOOGLE_DISCONNECTED__INFO__NO_ACCOUNTS: 'No connected accounts.',
    GOOGLE_LIST__OK: `Accounts listed.
      + To disconnect accounts: ${magenta(
        'sheetbase google disconnect [id]|all|active|local'
      )}
      + To change active account: ${magenta('sheetbase google active [id]')}`,
    PROJECT_BUILD__OK:
      'Project build completed!' +
      EOL +
      '    + Preview: ' +
      magenta('sheetbase preview') +
      EOL +
      '    + Re-deploy: ' +
      magenta('sheetbase deploy'),
    PROJECT_CONFIG_EXPORT__OK: (path: string) =>
      `Project configs exported to ${blue(path)}`,
    PROJECT_CONFIG_IMPORT__OK:
      'Project configs imported, view: ' + magenta('sheetbase configs'),
    PROJECT_CONFIG_UPDATE__OK:
      'Project configs updated, view: ' + magenta('sheetbase configs'),
    PROJECT_CONFIGS__OK:
      'Project configs listed, to update: ' +
      magenta('sheetbase config update key=value|...'),
    PROJECT_DEPLOY__OK: 'Project deployed!',
    PROJECT_SETUP__WARN__HOOK_ERROR: (name: string) =>
      `Error running hook ${blue(name)}.`,
    PROJECT_SETUP__OK: 'Project setup successfully.',
    PROJECT_START__OK__THEME: (
      name: string,
      cmdOptions: Record<string, unknown>
    ) => {
      let message = 'Sheetbase theme project created, next steps:';
      message += EOL + '    + Go to the project: ' + magenta('cd ' + name);
      if (cmdOptions.skipSetup) {
        message +=
          EOL + '    + Setup automatically: ' + magenta('sheetbase setup');
      }
      if (cmdOptions.skipInstall) {
        message +=
          EOL +
          '    + Install packages: ' +
          magenta('sheetbase backend install && sheetbase frontend install');
      }
      message += EOL + '    + Great, now start developing :)';
      return message;
    },
    PROJECT_START__OK__NOT_THEME: (
      name: string,
      cmdOptions: Record<string, unknown>
    ) => {
      let message = 'Sheetbase project created, next steps:';
      message += EOL + '    + Go to the project: ' + magenta('cd ' + name);
      if (cmdOptions.skipInstall) {
        message += EOL + '    + Install packages: ' + magenta('npm install');
      }
      message += EOL + '    + Great, now start developing :)';
      return message;
    },
    PROJECT_URL__OK: (name: string, url: string) =>
      `Link of ${green(name)}: ${blue(url)}\n    + To open, include "-o" flag.`,
    PROJECT_URLS__OK:
      'Links listed, to open a link: ' + magenta('sheetbase url -o <name>'),
  } as Record<string, string | Function>;

  constructor() {}

  log(type: string, code: string, exit = false, args: unknown[] = []): void {
    let message: string = code;
    // get the message
    let msg: unknown;
    if (type === 'error') {
      msg = this.errors[code];
    } else {
      msg = this.logs[code];
    }
    if (msg) {
      if (msg instanceof Function) {
        message = msg(...args);
      } else {
        message = msg as string;
      }
    }
    // log the message out
    if (type === 'error') {
      console.error(EOL + ` ${this.error} ${message}`);
      // eslint-disable-next-line no-process-exit
      return process.exit(1);
    } else if (type === 'warn') {
      console.log(EOL + ` ${this.warn} ${message}`);
    } else if (type === 'wait') {
      console.log(EOL + ` ${this.wait} ${message}`);
    } else if (type === 'info') {
      console.log(EOL + ` ${this.info} ${message}`);
    } else {
      console.log(EOL + ` ${this.ok} ${message}`);
    }
    // exit = 0
    if (exit) {
      // eslint-disable-next-line no-process-exit
      return process.exit();
    }
  }

  logOk(code: string, exit = false, args?: unknown[]): void {
    this.log('ok', code, exit, args);
  }

  logError(code: string, exit = false, args?: unknown[]): void {
    this.log('error', code, exit, args);
  }

  logWarn(code: string, exit = false, args?: unknown[]): void {
    this.log('warn', code, exit, args);
  }

  logWait(code: string, exit = false, args?: unknown[]): void {
    this.log('wait', code, exit, args);
  }

  logInfo(code: string, exit = false, args?: unknown[]): void {
    this.log('info', code, exit, args);
  }

  async logAction(
    description: string,
    action: () => Promise<unknown>,
    done?: string | {(result: unknown): string}
  ) {
    console.log(EOL + ' ' + description);

    // run the action
    const timeBegin = new Date().getTime();
    const result = await action();
    const spent = new Date().getTime() - timeBegin;

    // log done
    if (!done) {
      done = '... ' + green('done');
    } else if (done instanceof Function) {
      done = done(result);
    }
    console.log('   ' + done + ' ' + gray('(' + spent + 'ms)'));
  }
}
