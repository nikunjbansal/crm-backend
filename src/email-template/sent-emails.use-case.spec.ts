import { SendEmailsUseCase } from './send-emails.use-case';
import { EmailTemplateService } from './email-template.service';
import { NonProfitService } from '../non-profit/non-profit.service';
import { Repository } from 'typeorm';
import { SentEmail } from './sent-email.entity';
import { NotFoundException } from '@nestjs/common';

describe('SendEmailsUseCase', () => {
  let useCase: SendEmailsUseCase;
  let emailTemplateService: EmailTemplateService;
  let nonProfitService: NonProfitService;
  let sentEmailRepository: Repository<SentEmail>;

  beforeEach(() => {
    emailTemplateService = {
      findOne: jest.fn(),
    } as unknown as EmailTemplateService;

    nonProfitService = {
      findAll: jest.fn(),
    } as unknown as NonProfitService;

    sentEmailRepository = {
      create: jest.fn(),
      save: jest.fn(),
    } as unknown as Repository<SentEmail>;

    useCase = new SendEmailsUseCase(sentEmailRepository, emailTemplateService, nonProfitService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('sendEmail', () => {
    it('should send emails to all non-profits', async () => {
      // Mock data
      const templateId = 1;
      const template = {
        id: templateId,
        subject: 'Test subject {name} and {address}',
        body: 'Test body {name} and {name} and {address} and {address}',
      };
      const nonProfits = [
        { id: 1, name: 'NonProfit1', address: 'Address1', email: 'email1@test.com' },
        { id: 2, name: 'NonProfit2', address: 'Address2', email: 'email2@test.com' },
      ];

      // Mock service methods
      (emailTemplateService.findOne as jest.Mock).mockResolvedValue(template);
      (nonProfitService.findAll as jest.Mock).mockResolvedValue(nonProfits);
      (sentEmailRepository.create as jest.Mock).mockResolvedValue({
        
      })

      // Mock repository methods
      const createSpy = jest.spyOn(sentEmailRepository, 'create');
      const saveSpy = jest.spyOn(sentEmailRepository, 'save');

      // Call the method
      await useCase.sendEmail(templateId);

      // Assertions
      expect(emailTemplateService.findOne).toHaveBeenCalledWith(templateId);
      expect(nonProfitService.findAll).toHaveBeenCalled();
      expect(createSpy).toHaveBeenCalledTimes(nonProfits.length);
      expect(saveSpy).toHaveBeenCalledTimes(1);
      expect(createSpy).toHaveBeenNthCalledWith(1, {
        sentAt: expect.any(Date),
        template,
        nonProfit: nonProfits[0],
        subject: `Test subject ${nonProfits[0].name} and ${nonProfits[0].address}`,
        body: `Test body ${nonProfits[0].name} and ${nonProfits[0].name} and ${nonProfits[0].address} and ${nonProfits[0].address}`,
      })
    });

    it('should throw NotFoundException if template is not found', async () => {
      (emailTemplateService.findOne as jest.Mock).mockRejectedValue(new NotFoundException());
      await expect(useCase.sendEmail(1)).rejects.toThrow(NotFoundException);
    });
  });
});
