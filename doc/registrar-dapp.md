# Web-based Đapp Interface to ENS Registrars

### Introduction

This document specifies a web-based đapp interface for ENS (Ethereum 
Name Service) registrar contracts compatible with the ENS specification in 
EIP 137. Standardizing such interfaces is motivated by the expectation that 
numerous different đapps might need to interact with the same registrar 
contract. In such a case, having a spearate đapp implement all necessary 
user interactions with the registrar would save considerable redundant 
effort on the part of đapp developers as well as reduce the possibility of 
costly errors and vulnerabilities. Furthermore it would provide end users 
with a consistent, familiar interface for the same task of registering a 
named resource. Finally, it would unbundle the particular registrar from the 
đapp, allowing for the possibility to mix and match đapps with registrars in
a pluggable architecture.

### API

Đapps call the registrar UI by directing the browser to the registrar's 
own đapp, passing it the necessary arguments in the URL as query 
parameters. After performing the necessary interactions with the user, the
registrar's đapp might direct the browser further (typically, back to the
calling đapp), to addresses that might depend on whether the requested
name registration succeeded or failed.

All query parameters are optional, listed in the table below:

| Query parameter | Semantics |
| --------------- | --------- |
| `n` | Name to be registered. In its absense, the name should be inputed into the registrar đapp by the user. |
| `r` | Return redirection URL in case of successful registration. In its absence, no redirection takes place, the successful registration is simply confirmed on the UI. |
| `f` | Return redirection URL in case of failed or canceled registration. Defaults to that given in `r`. |

In each return redirection URL, wildcard variables prefixed by `$` 
(URL-encoded as `%24`) will be replaced by actual values as listed in the 
table below:

| Wildcard variable | Semantics |
| ----------------- | --------- |
| `$n` | Domain name as actually registered. |
| `$a` | Account identifier for the owner of the newly registered domain. |

Variables not defined in this table will be replaced by empty strings for 
facilitating (limited) forward compatibility.

### Binding between registrar and registrar đapp

In order to bind an interface đapp to a registrar contract 
deployed for a particular ENS domain, it must be registered under the reserved
name `nic` in the same domain. This allows for independent
upgrades for both the contract and the interface đapp, while providing a
secure, block chain certified binding between the two.

