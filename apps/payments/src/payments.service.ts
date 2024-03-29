import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Stripe from 'stripe';
import { CreateChargeDto } from './dto/create-charge.dto';

@Injectable()
export class PaymentsService {
  constructor(private readonly configService: ConfigService) {}
  private readonly stripe = new Stripe(
    this.configService.get('STRIPE_SECRET_KEY'),
    {
      apiVersion: '2023-10-16',
    },
  );

  async createCharge({ card, amount }: CreateChargeDto) {
    const paymentMethod = await this.stripe.paymentMethods.create({
      type: 'card',
      card,
    });
    const PaymentIntent = await this.stripe.paymentIntents.create({
      payment_method: paymentMethod.id,
      amount: amount * 100,
      confirm: true,
      currency: 'usd',
      payment_method_types: ['card'],
    });
    return PaymentIntent;
  }
}
