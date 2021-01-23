import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import {DocumentBuilder, SwaggerModule} from '@nestjs/swagger';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    const options = new DocumentBuilder()
        .setTitle('Owlatar')
        .setDescription('Owl avatar generator API')
        .setVersion('1.0.0')
        .addBearerAuth()
        .addTag('owls')
        .build();
    const document = SwaggerModule.createDocument(app, options, {
        include: [],
    });
    SwaggerModule.setup('api', app, document);

    await app.listen(3000);
}
bootstrap();
