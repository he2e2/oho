import { CustomButton } from '@/components';
import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';

export function ErrorPage() {
  const navigate = useNavigate();

  return (
    <styles.wrapper className='mw'>
      <h2>
        404 ERROR
        <br />
        페이지가 존재하지 않습니다.
      </h2>
      <div
        onClick={() => {
          navigate(`/`);
        }}
      >
        <CustomButton type='button' name='홈으로 돌아가기' />
      </div>
    </styles.wrapper>
  );
}

const styles = {
  wrapper: styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 2rem;

    h2 {
      color: #000;
      font-size: 2rem;
      font-style: normal;
      font-weight: 800;
      line-height: 3rem;
      text-align: center;
    }
  `,
};
