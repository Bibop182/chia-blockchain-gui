import React from 'react';
import { Trans } from '@lingui/macro';
import { useSelector } from 'react-redux';
// import moment from 'moment';
import {
  Typography,
  Tooltip,
} from '@material-ui/core';
import { Link, Table, Card } from '@chia/core';
import type { RootState } from '../../modules/rootReducer';
import type { Row } from '../core/components/Table/Table';

const cols = [
  {
    minWidth: '200px',
    field(row: Row) {
      return (
        <Tooltip title={row.challenge}>
          <span>{row.signage_point.challenge_hash}</span>
        </Tooltip>
      );
    },
    title: (
      <Trans>Challenge Hash</Trans>
    ),
  },
  {
    field: (row: Row) => row.signage_point.signage_point_index,
    title: <Trans>Index</Trans>,
  }, /*
  {
    width: '200px',
    field(row: Row) {
      if (row?.estimates?.length > 0) {
        const seconds = Math.min(...row.estimates);
        return moment.duration({ seconds }).humanize();
      }

      return null;
    },
    title: (
      <Flex alignItems="center" gap={1}>
        <span>
          <Trans>
            Best Estimate
          </Trans>
        </span>
        <TooltipIcon>
          <Trans>
            Best Estimate is how many seconds of time must be proved for your
            proofs.
          </Trans>
        </TooltipIcon>
      </Flex>
    ),
  }, */
];

export default function FarmLatestBlockChallenges() {
  const signagePoints = useSelector(
    (state: RootState) => state.farming_state.farmer.signage_points ?? [],
  );

  const plots = useSelector(
    (state: RootState) => state.farming_state.harvester.plots,
  );

  const hasPlots = !!plots && plots.length > 0;
  const reducedSignagePoints = signagePoints;

  return (
    <Card
      title={(
        <Trans>
          Latest Block Challenges
        </Trans>
      )}
      tooltip={hasPlots ? (
        <Trans>
          Below are the current block challenges. You may or may not have
          a proof of space for these challenges. These blocks do not
          currently contain a proof of time.
        </Trans>
      ): undefined}
    >
      {!hasPlots && (
        <Typography variant="body2">
          <Trans>
            Below are the current block challenges. You may or may not have a
            proof of space for these challenges. These blocks do not currently
            contain a proof of time.
          </Trans>
        </Typography>
      )}
      <Table
        cols={cols}
        rows={reducedSignagePoints}
        rowsPerPageOptions={[5, 10, 25, 100]}
        rowsPerPage={5}
        pages
      />
      <Typography variant="caption">
        <Trans>
          *Want to explore Chia’s blocks further? Check out{' '}
          <Link
            color="primary"
            href="https://www.chiaexplorer.com/"
            target="_blank"
          >
            Chia Explorer
          </Link>{' '}
          built by an open source developer.
        </Trans>
      </Typography>
    </Card>
  );
}
