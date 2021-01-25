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
        // options.backgroundColor = 'transparent';
        const dom = new JSDOM(`<!DOCTYPE html><body></body>`);
        const body = dom.window.document.querySelector('body');
        const svg = this.getEmptySvg(dom, options);
        const background = this.getBackground(dom, options);
        const owlBrows = this.getOwlBrows(dom, options);
        const owlBody = this.getOwlBody(dom, options);
        const owlBelly = this.getOwlBelly(dom, options);
        const owlFeet = this.getOwlFeet(dom, options);
        const owlWings = this.getOwlWings(dom, options);
        const owlBeak = this.getOwlBeak(dom, options);
        const owlEyes = this.getOwlEyes(dom, options);

        if (options && options.backgroundColor && options.backgroundColor !== 'transparent') {
            svg.appendChild(background);
        }
        svg.appendChild(owlBrows);
        svg.appendChild(owlBody);
        svg.appendChild(owlBelly);
        svg.appendChild(owlFeet);
        svg.appendChild(owlWings);
        svg.appendChild(owlBeak);
        svg.appendChild(owlEyes);
        body.appendChild(svg);

        return body.outerHTML;
    }


    getEmptySvg(dom, options: OwlOptions) {
        const svg = dom.window.document.createElement('svg');
        svg.setAttribute('id', 'owl');
        svg.setAttribute('width', options.sizeX + 'px');
        svg.setAttribute('height', options.sizeY + 'px');
        svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
        return svg;
    }


    getBackground(dom, options: OwlOptions) {
        const bg = dom.window.document.createElement('rect');
        bg.setAttribute('id', 'background');
        bg.setAttribute('x', '0px');
        bg.setAttribute('y', '0px');
        bg.setAttribute('width', options.sizeX + 'px');
        bg.setAttribute('height', options.sizeY + 'px');
        bg.setAttribute('fill', 'rgb(200,200,200)');
        return bg;
    }


    getOwlBrows(dom, options: OwlOptions) {
        const g = dom.window.document.createElement('g');
        g.setAttribute('id', 'owlBrows');
        const lb = dom.window.document.createElement('path');
        lb.setAttribute('d',
            'M' + (options.sizeX / 2 - options.sizeX * 0.35) + ',' + (options.sizeY / 2 - options.sizeY * 0.25) +
            'L' + (options.sizeX / 2 - options.sizeX * 0.35) + ',' + (options.sizeY / 2 - options.sizeY * 0.45) +
            'L' + (options.sizeX / 2 - options.sizeX * 0.10) + ',' + (options.sizeY / 2 - options.sizeY * 0.25) +
            'Z'
        );
        lb.setAttribute('fill', 'rgb(100,60,20)');
        const rb = dom.window.document.createElement('path');
        rb.setAttribute('d',
            'M' + (options.sizeX / 2 + options.sizeX * 0.35) + ',' + (options.sizeY / 2 - options.sizeY * 0.25) +
            'L' + (options.sizeX / 2 + options.sizeX * 0.35) + ',' + (options.sizeY / 2 - options.sizeY * 0.45) +
            'L' + (options.sizeX / 2 + options.sizeX * 0.10) + ',' + (options.sizeY / 2 - options.sizeY * 0.25) +
            'Z'
        );
        rb.setAttribute('fill', 'rgb(100,60,20)');
        g.appendChild(lb);
        g.appendChild(rb);

        return g;
    }


    getOwlBody(dom, options: OwlOptions) {
        const bd = dom.window.document.createElement('ellipse');
        bd.setAttribute('id', 'owlBody');
        bd.setAttribute('cx', options.sizeX / 2 + 'px');
        bd.setAttribute('cy', options.sizeY / 2 + 'px');
        bd.setAttribute('rx', options.sizeX * 0.45 + 'px');
        bd.setAttribute('ry', options.sizeY * 0.45 + 'px');
        bd.setAttribute('fill', 'rgb(100,60,20)');
        return bd;
    }


    getOwlBelly(dom, options: OwlOptions) {
        const b = dom.window.document.createElement('ellipse');
        b.setAttribute('id', 'owlBelly');
        b.setAttribute('cx', options.sizeX / 2 + 'px');
        b.setAttribute('cy', options.sizeY / 2 + options.sizeY * 0.19 + 'px');
        b.setAttribute('rx', options.sizeX * 0.25 + 'px');
        b.setAttribute('ry', options.sizeY * 0.25 + 'px');
        b.setAttribute('fill', 'rgb(150,80,30)');
        return b;
    }


    getOwlWings(dom, options: OwlOptions) {
        const wingHeight = options.sizeY * 0.25;
        const wingWidth = options.sizeX * 0.08;
        const g = dom.window.document.createElement('g');
        g.setAttribute('id', 'owlWings');
        // left wing
        const lw1 = dom.window.document.createElement('ellipse');
        const lw1Cx = options.sizeX / 2 - options.sizeX * 0.48 + wingWidth;
        const lw1Cy = options.sizeY / 2 + wingHeight - options.sizeY * 0.10
        lw1.setAttribute('cx',  lw1Cx+ 'px');
        lw1.setAttribute('cy', lw1Cy + 'px');
        lw1.setAttribute('rx', wingWidth + 'px');
        lw1.setAttribute('ry', wingHeight + 'px');
        lw1.setAttribute('transform', 'rotate(0,' + lw1Cx + ',' + lw1Cy + ')');
        lw1.setAttribute('stroke', 'rgb(0,0,0)');
        lw1.setAttribute('fill', 'rgb(80,50,15)');
        const lw2 = dom.window.document.createElement('ellipse');
        const lw2Cx = options.sizeX / 2 - options.sizeX * 0.44 + wingWidth;
        const lw2Cy = options.sizeY / 2 + wingHeight - options.sizeY * 0.05;
        lw2.setAttribute('cx',  lw2Cx+ 'px');
        lw2.setAttribute('cy',  lw2Cy+ 'px');
        lw2.setAttribute('rx', wingWidth * 0.8 + 'px');
        lw2.setAttribute('ry', wingHeight * 0.8 + 'px');
        lw2.setAttribute('transform', 'rotate(-10,' + lw2Cx + ',' + lw2Cy + ')');
        lw2.setAttribute('stroke', 'rgb(0,0,0)');
        lw2.setAttribute('fill', 'rgb(80,50,15)');
        const lw3 = dom.window.document.createElement('ellipse');
        const lw3Cx = options.sizeX / 2 - options.sizeX * 0.40 + wingWidth;
        const lw3Cy = options.sizeY / 2 + wingHeight - options.sizeY * 0.06;
        lw3.setAttribute('cx', lw3Cx + 'px');
        lw3.setAttribute('cy', lw3Cy + 'px');
        lw3.setAttribute('rx', wingWidth * 0.7 + 'px');
        lw3.setAttribute('ry', wingHeight * 0.7 + 'px');
        lw3.setAttribute('transform', 'rotate(-20,' + lw3Cx + ',' + lw3Cy + ')');
        lw3.setAttribute('stroke', 'rgb(0,0,0)');
        lw3.setAttribute('fill', 'rgb(80,50,15)');
        // right wing
        const rw1 = dom.window.document.createElement('ellipse');
        const rw1Cx = options.sizeX / 2 + options.sizeX * 0.48 - wingWidth;
        const rw1Cy = options.sizeY / 2 + wingHeight - options.sizeY * 0.10;
        rw1.setAttribute('cx', rw1Cx + 'px');
        rw1.setAttribute('cy', rw1Cy + 'px');
        rw1.setAttribute('rx', wingWidth + 'px');
        rw1.setAttribute('ry', wingHeight + 'px');
        rw1.setAttribute('transform', 'rotate(0,' + rw1Cx + ',' + rw1Cy + ')');
        rw1.setAttribute('stroke', 'rgb(0,0,0)');
        rw1.setAttribute('fill', 'rgb(80,50,15)');
        const rw2 = dom.window.document.createElement('ellipse');
        const rw2Cx = options.sizeX / 2 + options.sizeX * 0.44 - wingWidth;
        const rw2Cy = options.sizeY / 2 + wingHeight - options.sizeY * 0.05;
        rw2.setAttribute('cx',  rw2Cx+ 'px');
        rw2.setAttribute('cy',  rw2Cy+ 'px');
        rw2.setAttribute('rx', wingWidth * 0.8 + 'px');
        rw2.setAttribute('ry', wingHeight * 0.8 + 'px');
        rw2.setAttribute('transform', 'rotate(+10,' + rw2Cx + ',' + rw2Cy + ')');
        rw2.setAttribute('stroke', 'rgb(0,0,0)');
        rw2.setAttribute('fill', 'rgb(80,50,15)');
        const rw3 = dom.window.document.createElement('ellipse');
        const rw3Cx = options.sizeX / 2 + options.sizeX * 0.40 - wingWidth;
        const rw3Cy = options.sizeY / 2 + wingHeight - options.sizeY * 0.06;
        rw3.setAttribute('cx', rw3Cx + 'px');
        rw3.setAttribute('cy', rw3Cy + 'px');
        rw3.setAttribute('rx', wingWidth * 0.7 + 'px');
        rw3.setAttribute('ry', wingHeight * 0.7 + 'px');
        rw3.setAttribute('transform', 'rotate(+20,' + rw3Cx + ',' + rw3Cy + ')');
        rw3.setAttribute('stroke', 'rgb(0,0,0)');
        rw3.setAttribute('fill', 'rgb(80,50,15)');
        g.appendChild(lw1);
        g.appendChild(lw2);
        g.appendChild(lw3);
        g.appendChild(rw1);
        g.appendChild(rw2);
        g.appendChild(rw3);

        return g;
    }


    getOwlEyes(dom, options: OwlOptions) {
        const eyeRadius = options.sizeX * 0.15;
        const g = dom.window.document.createElement('g');
        g.setAttribute('id', 'owlEyes');
        const leftEyeArea = dom.window.document.createElement('circle');
        leftEyeArea.setAttribute('cx', options.sizeX / 2 - eyeRadius * 1.1 + 'px');
        leftEyeArea.setAttribute('cy', options.sizeY / 2 - eyeRadius + 'px');
        leftEyeArea.setAttribute('r', eyeRadius * 1.4 + 'px');
        leftEyeArea.setAttribute('fill', 'rgb(150,80,30)');
        const leftEye = dom.window.document.createElement('circle');
        leftEye.setAttribute('cx', options.sizeX / 2 - eyeRadius * 1.1 + 'px');
        leftEye.setAttribute('cy', options.sizeY / 2 - eyeRadius + 'px');
        leftEye.setAttribute('r', eyeRadius + 'px');
        leftEye.setAttribute('fill', 'rgb(200,200,0)');
        const leftPupil = dom.window.document.createElement('circle');
        leftPupil.setAttribute('cx', options.sizeX / 2 - eyeRadius * 1.1 + 'px');
        leftPupil.setAttribute('cy', options.sizeY / 2 - eyeRadius + 'px');
        leftPupil.setAttribute('r', eyeRadius * 0.3 + 'px');
        leftPupil.setAttribute('fill', 'rgb(0,0,0)');
        // right eye
        const rightEyeArea = dom.window.document.createElement('circle');
        rightEyeArea.setAttribute('cx', options.sizeX / 2 + eyeRadius * 1.1 + 'px');
        rightEyeArea.setAttribute('cy', options.sizeY / 2 - eyeRadius + 'px');
        rightEyeArea.setAttribute('r', eyeRadius * 1.4 + 'px');
        rightEyeArea.setAttribute('fill', 'rgb(150,80,30)');
        const rightEye = dom.window.document.createElement('circle');
        rightEye.setAttribute('cx', options.sizeX / 2 + eyeRadius * 1.1 + 'px');
        rightEye.setAttribute('cy', options.sizeY / 2 - eyeRadius + 'px');
        rightEye.setAttribute('r', eyeRadius + 'px');
        rightEye.setAttribute('fill', 'rgb(200,200,0)');
        const rightPupil = dom.window.document.createElement('circle');
        rightPupil.setAttribute('cx', options.sizeX / 2 + eyeRadius * 1.1 + 'px');
        rightPupil.setAttribute('cy', options.sizeY / 2 - eyeRadius + 'px');
        rightPupil.setAttribute('r', eyeRadius * 0.3 + 'px');
        rightPupil.setAttribute('fill', 'rgb(0,0,0)');
        g.appendChild(leftEyeArea);
        g.appendChild(rightEyeArea);
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
            'M' + (options.sizeX / 2 - options.sizeX * 0.08) + ',' + (options.sizeY / 2 - options.sizeY * 0.05) +
            'L' + (options.sizeX / 2 + options.sizeX * 0.08) + ',' + (options.sizeY / 2 - options.sizeY * 0.05) +
            'L' + (options.sizeX / 2) + ',' + (options.sizeY / 2 + options.sizeY * 0.15) +
            'Z'
        );
        beak.setAttribute('fill', 'rgb(128,128,0)');
        return beak;
    }


    getOwlFeet(dom, options: OwlOptions) {
        const fingerHeight = options.sizeY * 0.1;
        const fingerWidth = options.sizeX * 0.05;
        const g = dom.window.document.createElement('g');
        g.setAttribute('id', 'owlFeet');
        // left fingers
        for (let i = 0; i < 3; i++) {
            const finger = dom.window.document.createElement('ellipse');
            finger.setAttribute('cx', options.sizeX / 2 - fingerWidth * (4 - i) * 0.9 + 'px');
            finger.setAttribute('cy', options.sizeY - fingerHeight / 2 + 'px');
            finger.setAttribute('rx', fingerWidth / 2 + 'px');
            finger.setAttribute('ry', fingerHeight / 2 + 'px');
            finger.setAttribute('fill', 'rgb(128,128,0)');
            g.appendChild(finger);
        }
        // right fingers
        for (let i = 0; i < 3; i++) {
            const finger = dom.window.document.createElement('ellipse');
            finger.setAttribute('cx', options.sizeX / 2 + fingerWidth * (4 - i) * 0.9 + 'px');
            finger.setAttribute('cy', options.sizeY - fingerHeight / 2 + 'px');
            finger.setAttribute('rx', fingerWidth / 2 + 'px');
            finger.setAttribute('ry', fingerHeight / 2 + 'px');
            finger.setAttribute('fill', 'rgb(128,128,0)');
            g.appendChild(finger);
        }

        return g;
    }

}
