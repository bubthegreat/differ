"""Setup configuration and dependencies for the Crypto Logger."""

import setuptools

COMMANDS = []

PACKAGES = setuptools.find_packages()


REQUIREMENTS = [requirement for requirement in open('requirements.txt').readlines()]


# pylint: disable=bad-whitespace
setuptools.setup(
    name              = 'differ_api',
    version           = '0.1.0.0',
    description       = 'This is a fancy async rest API!',
    packages          = PACKAGES,
    python_requires   = '>=3.6.6',
    entry_points      = { 'console_scripts': COMMANDS },
    install_requires  = REQUIREMENTS,
)
