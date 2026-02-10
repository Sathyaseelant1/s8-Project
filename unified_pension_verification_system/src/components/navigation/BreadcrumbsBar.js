import { Breadcrumbs, Stack, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

const labelMap = {
  dashboard: 'Dashboard',
  beneficiaries: 'Unified Beneficiary Database',
  duplicates: 'Duplicate Detection',
  eligibility: 'Eligibility Validation',
  coordination: 'Central-State Coordination',
  'audit-logs': 'Audit Logs',
  login: 'Login',
};

const BreadcrumbsBar = ({ pathname }) => {
  const segments = pathname.split('/').filter(Boolean);
  const crumbs = segments.map((segment, index) => {
    const to = `/${segments.slice(0, index + 1).join('/')}`;
    return { label: labelMap[segment] || segment, to };
  });

  if (crumbs.length === 0) return null;

  return (
    <Stack spacing={1} sx={{ mb: 2 }}>
      <Breadcrumbs>
        <Link to="/dashboard">Home</Link>
        {crumbs.map((crumb, index) => (
          <Link key={crumb.to} to={crumb.to}>
            {index === crumbs.length - 1 ? (
              <Typography component="span" color="text.primary">
                {crumb.label}
              </Typography>
            ) : (
              crumb.label
            )}
          </Link>
        ))}
      </Breadcrumbs>
    </Stack>
  );
};

export default BreadcrumbsBar;
