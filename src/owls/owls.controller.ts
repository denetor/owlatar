import {Controller, Get, Param, Res} from '@nestjs/common';
import {ApiOperation, ApiTags} from '@nestjs/swagger';
import {OwlsService} from './owls.service';
import {options} from 'tsconfig-paths/lib/options';

@Controller('owls')
@ApiTags('owls')
export class OwlsController {
    constructor(private readonly owlsService: OwlsService) {}

    @Get('test.svg')
    testSvg(@Res() res) {
        if (!res.headers) {
            res.headers = {};
        }
        res.headers['Content-Type'] = 'image/svg+xml';
        res.headers['Content-Disposition'] = 'attachment; filename=test.svg';
        res.end(this.owlsService.test());
    }

    @Get(':size/img-:optionsCode.svg')
    @ApiOperation({
        description: 'Generate an avatar given its size and a parameter string',
    })
    generate(@Param('size') size: number, @Param('optionsCode') optionsCode: string, @Res() res) {
        // generate headers object if missing
        if (!res.headers) {
            res.headers = {};
        }
        res.headers['Content-Type'] = 'image/svg+xml';
        res.headers['Content-Disposition'] =
            'attachment; filename=owlatar' + (optionsCode ? '-' : '') + optionsCode + '-' + size + '.svg';
        const options = this.owlsService.getOptions(size, optionsCode);
        res.end(this.owlsService.generate(options));
    }
}
