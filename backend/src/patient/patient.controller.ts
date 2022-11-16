import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  Param,
  SerializeOptions,
  UseInterceptors,
} from '@nestjs/common'
import dayjs from 'dayjs'
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino'

import { FindPatientRes } from './patient.dto'

@Controller('patient')
@UseInterceptors(ClassSerializerInterceptor)
@SerializeOptions({
  excludeExtraneousValues: true,
})
export class PatientController {
  constructor(
    @InjectPinoLogger(PatientController.name)
    private readonly logger: PinoLogger,
  ) {}

  @Get(':id')
  async find(@Param('id') id: string): Promise<FindPatientRes[]> {
    if (id !== 'c92a184sf8') return []
    return [
      {
        headerText: 'Investigation (Gastroenterology)',
      },
      {
        headerText: 'Discharge',
      },
      {
        headerText: 'Admitted to Emergency Department',
        happenedAt: dayjs().subtract(17, 'hours').valueOf(),
      },
      {
        headerText: 'Seen by Doctor',
        happenedAt: dayjs()
          .subtract(16, 'hours')
          .subtract(51, 'minute')
          .valueOf(),
      },
      {
        headerText: 'Admitted to ICU',
        happenedAt: dayjs()
          .subtract(16, 'hours')
          .subtract(24, 'minute')
          .valueOf(),
      },
      {
        headerText: 'Investigation (Radiology)',
        happenedAt: dayjs()
          .subtract(12, 'hours')
          .subtract(12, 'minute')
          .valueOf(),
      },
      {
        headerText: 'Warded at L4 (Room 4)',
        happenedAt: dayjs()
          .subtract(11, 'hours')
          .subtract(48, 'minute')
          .valueOf(),
      },
    ]
  }
}
