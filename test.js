import test from 'ava';
import execa from 'execa';

test('prefix filter works', async t => {
  const env = {
    FOOBAR: 'nope',
    DOTENV_TEST_FOO: 'hoi',
  };
  t.is(
    await execa.stdout('./index.js', ['--prefix=DOTENV_TEST'], { env }),
    'DOTENV_TEST_FOO="hoi"'
  );
});

test('prefix filter multiple works', async t => {
  const env = {
    FOOBAR: 'nope',
    DOTENV_TEST_FOO: 'hoi',
    DOTENV_PONY_FOO: 'bar',
  };
  const result = await execa.stdout('./index.js', ['--prefix=DOTENV_TEST'], {
    env,
  });
  t.is(
    await execa.stdout(
      './index.js',
      ['--prefix=DOTENV_TEST', '--prefix=DOTENV_PONY'],
      { env }
    ),
    'DOTENV_TEST_FOO="hoi"\nDOTENV_PONY_FOO="bar"'
  );
});

test('suffix filter works', async t => {
  const env = {
    APP_SECRET: 'hoi',
  };
  t.is(
    await execa.stdout('./index.js', ['--suffix=_SECRET'], { env }),
    'APP_SECRET="hoi"'
  );
});

test('crashes when there are not envs', async t => {
  try {
    await execa('./index.js', ['--prefix=jasdlfjasdfadf']);
    t.fail('This should have thrown an Error');
  } catch (err) {
    t.is(err.code, 1);
  }
});
