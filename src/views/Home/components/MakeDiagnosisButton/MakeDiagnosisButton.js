import React from 'react';
import { useHistory } from 'react-router-dom';
import { withTranslation } from 'react-i18next';
import { Icon } from '../../../RiskTest/RiskTest.styled';
import { Button } from '../../../../components';
import Routes from '../../../../routes';

const MakeDiagnosisButton = ({ t }) => {
  const history = useHistory();
  const goToDiagnosis = () => {
    history.push({
      pathname: Routes.Diagnosis,
      search: '?p=1'
    });
  };

  return (
    <Button
      onClick={goToDiagnosis}
      label={t('make_diagnosis_button_text1')}
      type="border"
      icon={<Icon />}
    />
  );
};

export default withTranslation()(MakeDiagnosisButton);
