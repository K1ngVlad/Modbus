import { Test, TestingModule } from '@nestjs/testing';
import { ScadaService } from './scada.service';

describe('ScadaService', () => {
  let service: ScadaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ScadaService],
    }).compile();

    service = module.get<ScadaService>(ScadaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
