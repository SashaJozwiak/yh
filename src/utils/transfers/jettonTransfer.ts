//import { JettonBalance } from '@ton-api/client';
import { beginCell, Address, toNano } from '@ton/core';
import { SendTransactionRequest } from '@tonconnect/ui-react';
import { fromDecimals } from './decimals';
import { Asset } from '../../Earn/earnStore/types';

export const getJettonSendTransactionRequest = (
    jetton: Asset,
    amountStr: string,
    recipientAddressStr: string,
    senderAddress: Address
): SendTransactionRequest => {
    const amount = fromDecimals(amountStr, jetton.jetton.decimals);

    const recipient = Address.parse(recipientAddressStr);

    const body = beginCell()
        .storeUint(0xf8a7ea5, 32) // jetton transfer operation
        .storeUint(0, 64) // query ID
        .storeCoins(amount) // jetton amount
        .storeAddress(recipient)
        .storeAddress(senderAddress)
        .storeUint(0, 1) // empty payload
        .storeCoins(1n) // forward TON amount
        .endCell();

    console.log('body:', body.toBoc().toString('base64'))

    return {
        validUntil: Math.floor(Date.now() / 1000) + 360,
        messages: [{
            address: jetton.wallet_address.address.toString(),// toRawString() ???
            amount: toNano('0.14').toString(), // estimated fee
            payload: body.toBoc().toString('base64'),
        }]
    };
};
