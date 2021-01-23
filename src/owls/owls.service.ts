import {Injectable} from '@nestjs/common';
import {OwlOptions} from './owl-options';
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
        options.backgroundColor = 'transparent';
        const dom = new JSDOM(`<!DOCTYPE html><body></body>`);
        const body = dom.window.document.querySelector('body');
        const svg = this.getEmptySvg(dom, options);
        const background = this.getBackground(dom, options);
        const owlBody = this.getOwlBody(dom, options);
        const owlBelly = this.getOwlBelly(dom, options);
        const owlWings = this.getOwlWings(dom, options);
        const owlEyes = this.getOwlEyes(dom, options);
        // const owlEyes = this.getOwlBrows(dom, options);
        const owlBeak = this.getOwlBeak(dom, options);
        const owlFeet = this.getOwlFeet(dom, options);

        if (options && options.backgroundColor && options.backgroundColor !== 'transparent') {
            svg.appendChild(background);
        }
        svg.appendChild(owlBody);
        svg.appendChild(owlBelly);
        svg.appendChild(owlWings);
        svg.appendChild(owlEyes);
        // svg.appendChild(owlBrows);
        svg.appendChild(owlBeak);
        svg.appendChild(owlFeet);
        body.appendChild(svg);

        return body.outerHTML;
    }


    getEmptySvg(dom, options: OwlOptions) {
        const svg = dom.window.document.createElement('svg');
        svg.setAttribute('id', 'owl');
        svg.setAttribute('width', options.sizeX);
        svg.setAttribute('height', options.sizeY);
        svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
        return svg;
    }


    getBackground(dom, options: OwlOptions) {
        const bg = dom.window.document.createElement('rect');
        bg.setAttribute('id', 'background');
        bg.setAttribute('x', 0);
        bg.setAttribute('y', 0);
        bg.setAttribute('width', options.sizeX);
        bg.setAttribute('height', options.sizeY);
        bg.setAttribute('style', 'fill:rgb(200,200,200)');
        return bg;
    }


    getOwlBody(dom, options: OwlOptions) {
        const bd = dom.window.document.createElement('ellipse');
        bd.setAttribute('id', 'owlBody');
        bd.setAttribute('cx', options.sizeX / 2);
        bd.setAttribute('cy', options.sizeY / 2);
        bd.setAttribute('rx', options.sizeX * 0.45);
        bd.setAttribute('ry', options.sizeY * 0.45);
        bd.setAttribute('style', 'fill:rgb(100,60,20)');
        return bd;
    }


    getOwlBelly(dom, options: OwlOptions) {
        const b = dom.window.document.createElement('ellipse');
        b.setAttribute('id', 'owlBelly');
        b.setAttribute('cx', options.sizeX / 2);
        b.setAttribute('cy', options.sizeY / 2 + options.sizeY * 0.24);
        b.setAttribute('rx', options.sizeX * 0.20);
        b.setAttribute('ry', options.sizeY * 0.20);
        b.setAttribute('style', 'fill:rgb(150,80,30)');
        return b;
    }


    getOwlEyes(dom, options: OwlOptions) {
        const eyeRadius = options.sizeX * 0.15;
        const g = dom.window.document.createElement('g');
        g.setAttribute('id', 'owlEyes');
        const leftEye = dom.window.document.createElement('circle');
        leftEye.setAttribute('cx', options.sizeX / 2 - eyeRadius * 1.1);
        leftEye.setAttribute('cy', options.sizeY / 2 - eyeRadius);
        leftEye.setAttribute('r', eyeRadius);
        leftEye.setAttribute('style', 'fill:rgb(200,200,0)');
        const leftPupil = dom.window.document.createElement('circle');
        leftPupil.setAttribute('cx', options.sizeX / 2 - eyeRadius * 1.1);
        leftPupil.setAttribute('cy', options.sizeY / 2 - eyeRadius);
        leftPupil.setAttribute('r', eyeRadius * 0.3);
        leftPupil.setAttribute('style', 'fill:rgb(0,0,0)');
        const rightEye = dom.window.document.createElement('circle');
        rightEye.setAttribute('cx', options.sizeX / 2 + eyeRadius * 1.1);
        rightEye.setAttribute('cy', options.sizeY / 2 - eyeRadius);
        rightEye.setAttribute('r', eyeRadius);
        rightEye.setAttribute('style', 'fill:rgb(200,200,0)');
        const rightPupil = dom.window.document.createElement('circle');
        rightPupil.setAttribute('cx', options.sizeX / 2 + eyeRadius * 1.1);
        rightPupil.setAttribute('cy', options.sizeY / 2 - eyeRadius);
        rightPupil.setAttribute('r', eyeRadius * 0.3);
        rightPupil.setAttribute('style', 'fill:rgb(0,0,0)');
        g.appendChild(leftEye);
        g.appendChild(rightEye);
        g.appendChild(leftPupil);
        g.appendChild(rightPupil);
        return g;
    }

    getOwlBeak(dom, options: OwlOptions) {
        const beak = dom.window.document.createElement('path');
        beak.setAttribute('id', 'owlBeak');
        beak.setAttribute('d',
            'M' + (options.sizeX / 2 - options.sizeX * 0.08) + ',' + (options.sizeY / 2) +
            'L' + (options.sizeX / 2 + options.sizeX * 0.08) + ',' + (options.sizeY / 2) +
            'L' + (options.sizeX / 2) + ',' + (options.sizeY / 2 + options.sizeY * 0.15) +
            'Z'
        );
        beak.setAttribute('style', 'fill:rgb(128,128,0)');
        return beak;
    }


    getOwlWings(dom, options: OwlOptions) {
        const g = dom.window.document.createElement('g');

        return g;
    }


    getOwlFeet(dom, options: OwlOptions) {
        const fingerHeight = options.sizeY * 0.1;
        const fingerWidth = options.sizeX * 0.05;
        const g = dom.window.document.createElement('g');
        g.setAttribute('id', 'owlFeet');
        // left fingers
        for (let i = 0; i < 3; i++) {
            const finger = dom.window.document.createElement('ellipse');
            finger.setAttribute('cx', options.sizeX / 2 - fingerWidth * (4 - i) * 0.9);
            finger.setAttribute('cy', options.sizeY - fingerHeight / 2);
            finger.setAttribute('rx', fingerWidth / 2);
            finger.setAttribute('ry', fingerHeight / 2);
            finger.setAttribute('style', 'fill:rgb(128,128,0)');
            g.appendChild(finger);
        }
        // right fingers
        for (let i = 0; i < 3; i++) {
            const finger = dom.window.document.createElement('ellipse');
            finger.setAttribute('cx', options.sizeX / 2 + fingerWidth * (4 - i) * 0.9);
            finger.setAttribute('cy', options.sizeY - fingerHeight / 2);
            finger.setAttribute('rx', fingerWidth / 2);
            finger.setAttribute('ry', fingerHeight / 2);
            finger.setAttribute('style', 'fill:rgb(128,128,0)');
            g.appendChild(finger);
        }

        return g;
    }

}
