import {Injectable} from '@nestjs/common';
import {OwlOptions} from './owl-options';
const d3 = require('d3');
const jsdom = require('jsdom');
const {JSDOM} = jsdom;

@Injectable()
export class OwlsService {
    /**
     * Given the size and an optionsCode, generates the options instance used to generate the avatar
     */
    getOptions(size: number, optionsCode: string): OwlOptions {
        const options = new OwlOptions(optionsCode);
        options.sizeX = size;
        options.sizeY = size;

        return options;
    }

    /**
     * Generate an avatar given an options object
     */
    generate(options: OwlOptions) {
        const dom = new JSDOM(`<!DOCTYPE html><body></body>`);
        let body = d3.select(dom.window.document.querySelector('body'));
        let svg = this.getCanvas(body, options);

        // this.appendBackground(svg, options);
        this.appendBody(svg, options);
        // this.appendBelly(svg, options);
        // this.appendWings(svg, options);
        this.appendEyes(svg, options);
        this.appendBeak(svg, options);
        // this.appendFeet(svg, options);

        return body.html();
    }

    // https://medium.com/@92sharmasaurabh/generate-svg-files-using-nodejs-d3-647d5b4f56eb
    // https://stackoverflow.com/questions/9948350/how-to-use-d3-in-node-js-properly
    test() {
        const owlData = {
            sizeX: 500,
            sizeY: 500,
        };
        const dom = new JSDOM(`<!DOCTYPE html><body></body>`);
        let body = d3.select(dom.window.document.querySelector('body'));
        let svg = this.getCanvas(body, owlData);
        // this.appendBody(svg, owlData);
        // this.appendEyes(svg, owlData);
        // this.appendBeak(svg, owlData);

        return body.html();
    }

    getCanvas(body, owlData) {
        return body
            .append('svg')
            .attr('width', owlData.sizeX)
            .attr('height', owlData.sizeY)
            .attr('xmlns', 'http://www.w3.org/2000/svg');
    }

    /**
     * Append owl body
     */
    appendBody(svg, options: OwlOptions) {
        svg.append('circle')
            .attr('cx', options.sizeX / 2)
            .attr('cy', options.sizeY / 2)
            .attr('r', options.sizeX * 0.45)
            .style(
                'fill',
                options && options.backgroundColor && options.backgroundColor !== 'standard'
                    ? options.backgroundColor
                    : 'brown',
            );
    }

    appendEyes(svg, options: OwlOptions) {
        const eyeRadius = options.sizeX * 0.15;
        svg.append('circle')
            .attr('cx', options.sizeX / 2 - eyeRadius * 1.1)
            .attr('cy', options.sizeY / 2 - eyeRadius)
            .attr('r', eyeRadius)
            .style('fill', 'yellow');
        svg.append('circle')
            .attr('cx', options.sizeX / 2 + eyeRadius * 1.1)
            .attr('cy', options.sizeY / 2 - eyeRadius)
            .attr('r', eyeRadius)
            .style('fill', 'yellow');
    }

    appendBeak(svg, owlData) {
        const beak = d3.symbol().type(d3.symbolTriangle);
        svg.append('path')
            .attr('d', beak)
            .attr('transform', function (d) {
                return 'translate(' + owlData.sizeX / 2 + ', ' + owlData.sizeY / 2 + '),' + 'rotate(180),' + 'scale(3)';
            })
            .style('fill', 'orange');
    }
}
