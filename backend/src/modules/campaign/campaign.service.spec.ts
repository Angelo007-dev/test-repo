import { Test, TestingModule } from '@nestjs/testing';
import { CampaignController } from './campaign.controller';
import { CampaignService } from './campaign.service';
import { CreateCampaignDto } from 'src/dto/CreateCampaignDto';
import { ECampaignStatus } from 'src/constant/constant';

const mockCampaignService = {
  createCampaign: jest.fn(),
  campaignList: jest.fn(),
  servedAd: jest.fn(),
  getStats: jest.fn(),
};

describe('CampaignController', () => {
  let controller: CampaignController;
  let service: typeof mockCampaignService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CampaignController],
      providers: [
        {
          provide: CampaignService,
          useValue: mockCampaignService,
        },
      ],
    }).compile();

    controller = module.get<CampaignController>(CampaignController);
    service = module.get<CampaignService>(CampaignService) as any;
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a campaign', async () => {
    const dto: CreateCampaignDto = {
      name: 'Test',
      advertiser: 'Acme',
      budget: 100,
      impressionServed: 0,
      targetCountries: ['FR'],
      startDate: new Date('2026-03-10'),
      endDate: new Date('2026-03-15'),
      status: ECampaignStatus.ACTIVE,
    };

    mockCampaignService.createCampaign.mockResolvedValue({
      id: '1',
      ...dto,
    });

    const result = await controller.campaignCreate(dto);

    expect(result).toHaveProperty('id');
    expect(mockCampaignService.createCampaign).toHaveBeenCalledWith(dto);
  });
});