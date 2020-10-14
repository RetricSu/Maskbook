import React, { useEffect, useCallback, ChangeEvent, useState, useMemo } from 'react'
import { makeStyles, Theme, createStyles, Typography, Box } from '@material-ui/core'
import BigNumber from 'bignumber.js'
import { SelectTokenChip, SelectTokenChipProps } from '../../../../web3/UI/SelectTokenChip'
import { formatBalance } from '../../../Wallet/formatter'
import type { Token } from '../../../../web3/types'
import { useStylesExtends } from '../../../../components/custom-ui-helper'

/***
 * TO-DO: move to public shared UI components
 * */

const useStyles = makeStyles((theme: Theme) => {
    return createStyles({
        root: {},
        input: {
            '&::-webkit-outer-spin-button, &::-webkit-inner-spin-button': {
                '-webkit-appearance': 'none',
                margin: 0,
            },
            '-moz-appearance': 'textfield',
        },
        max: {
            marginRight: theme.spacing(0.5),
            borderRadius: 8,
        },
        token: {
            whiteSpace: 'pre',
            maxWidth: 300,
            paddingLeft: theme.spacing(1),
        },
        balance: {
            fontSize: 12,
            margin: theme.spacing(1),
        },
    })
})

export interface SetTokenPanelProps extends withClasses<KeysInferFromUseStyles<typeof useStyles>> {
    balance: string
    label: string
    token?: Token | null
    SelectTokenChip?: Partial<SelectTokenChipProps>
}

export function SetTokenPanel(props: SetTokenPanelProps) {
    const { balance, token, label } = props

    const classes = useStylesExtends(useStyles(), props)
    return token ? (
        <div>
            <Typography className={classes.balance} color="textSecondary" variant="body2" component="span">
                Balance: {formatBalance(new BigNumber(balance), token.decimals, 6)}
            </Typography>
            <Box display="inline">
                <SelectTokenChip token={token} {...props.SelectTokenChip} />
            </Box>
        </div>
    ) : (
        <div>
            <Typography className={classes.balance} color="textSecondary" variant="body2" component="span">
                -
            </Typography>
            <SelectTokenChip token={token} {...props.SelectTokenChip} />
        </div>
    )
}
