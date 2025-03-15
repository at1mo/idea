import { env } from '../env';
import { promises as fs } from 'fs';
import path from 'path';
import fg from 'fast-glob';
import Handlebars from 'handlebars';
import _ from 'lodash';
import { sendEmailThroughBrevo } from '../brevo';
import { logger } from '../logger';

const getHbrTemplates = _.memoize(async () => {
  const htmlPathsPattern = path.resolve(
    __dirname,
    '../../emails/dist/**/*.html'
  );

  // Приводим путь к POSIX-формату (для совместимости с Windows)
  const normalizedPattern = htmlPathsPattern.split(path.sep).join('/');

  const htmlPaths = fg.sync(normalizedPattern);
  const hbrTemplates: Record<string, HandlebarsTemplateDelegate> = {};
  for (const htmlPath of htmlPaths) {
    const templateName = path.basename(htmlPath, '.html');
    const htmlTemplate = await fs.readFile(htmlPath, 'utf8');

    hbrTemplates[templateName] = Handlebars.compile(htmlTemplate);
  }
  return hbrTemplates;
});

const getEmailHtml = async (
  templateName: string,
  templateVariables: Record<string, string> = {}
) => {
  const hbrTemplates = await getHbrTemplates();
  const hbrTemplate = hbrTemplates[templateName];
  const html = hbrTemplate(templateVariables);
  return html;
};

export const sendEmail = async ({
  to,
  subject,
  templateName,
  templateVariables = {},
}: {
  to: string;
  subject: string;
  templateName: string;
  templateVariables?: Record<string, any>;
}) => {
  try {
    const fullTemplateVariables = {
      ...templateVariables,
      homeUrl: env.WEBAPP_URL,
    };

    const html = await getEmailHtml(templateName, fullTemplateVariables);
    const { loggableResponse } = await sendEmailThroughBrevo({
      to,
      html,
      subject,
    });

    logger.info('email', 'sendEmail', {
      to,
      templateName,
      fullTemplateVariables,
      response: loggableResponse,
    });
    return { ok: true };
  } catch (error) {
    logger.error('email', error);
    return { ok: false };
  }
};
