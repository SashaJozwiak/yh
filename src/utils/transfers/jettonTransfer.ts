//import { JettonBalance } from '@ton-api/client';
import { beginCell, Address, toNano } from '@ton/ton';
import { SendTransactionRequest } from '@tonconnect/ui-react';
import { fromDecimals } from './decimals';
import { Asset } from '../../Earn/earnStore/types';

export const getJettonSendTransactionRequest = (
    jetton: Asset,
    amountStr: string,
    recipientAddressStr: string,
    senderAddress: string
): SendTransactionRequest => {
    const amount = fromDecimals(amountStr, jetton.jetton.decimals);

    const recipient = Address.parse(recipientAddressStr);
    const senderAddressParse = Address.parse(senderAddress);

    const body = beginCell()
        .storeUint(0xf8a7ea5, 32) // jetton transfer operation
        .storeUint(0, 64) // query ID
        .storeCoins(amount) // jetton amount
        .storeAddress(recipient)
        .storeAddress(senderAddressParse)
        //.storeUint(0, 1) // empty payload
        .storeBit(0) // Нет payload'а
        .storeCoins(toNano('0.01')) // forward TON amount
        //.storeCoins(1n) // forward TON amount
        .storeBit(0) // Нет доп. payload'а
        //.storeUint(0, 1) // forward payload
        .endCell();

    console.log('amount:', amount);
    console.log('recipient:', recipient.toString());
    console.log('senderAddress:', senderAddress.toString());
    console.log('body:', body.toBoc().toString('base64'));

    return {
        validUntil: Math.floor(Date.now() / 1000) + 600,
        messages: [{
            address: jetton.wallet_address.address.toString(),// toRawString() ???
            amount: toNano('0.05').toString(), // estimated fee
            payload: body.toBoc().toString('base64'),
        }]
    };
};
