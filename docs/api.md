## Modules

<dl>
<dt><a href="#module_Electron API">Electron API</a></dt>
<dd></dd>
</dl>

## Classes

<dl>
<dt><a href="#Welcome">Welcome</a></dt>
<dd><p>Welcome Component</p>
</dd>
</dl>

## Constants

<dl>
<dt><a href="#NAME">NAME</a></dt>
<dd><p>A middleware which acts like a service, because it is stateful
and &quot;long-running&quot; in the background. It provides the ability
for actions to install a function to be run once when a specific
condition is met by an action coming through the system. Think of
it as a thunk that blocks until the condition is met. Example:</p>
<pre><code class="language-javascript">const services = { WAIT_UNTIL: require(&#39;wait-service&#39;).NAME };

{ type: services.WAIT_UNTIL,
  predicate: action =&gt; action.type === constants.ADD_ITEM,
  run: (dispatch, getState, action) =&gt; {
    // Do anything here. You only need to accept the arguments
    // if you need them. `action` is the action that satisfied
    // the predicate.
  }
}
</code></pre>
</dd>
</dl>

<a name="module_Electron API"></a>

## Electron API

* [Electron API](#module_Electron API)
    * [~checkRedirectToWelcomePage()](#module_Electron API..checkRedirectToWelcomePage)
    * [~setNotFirstTimeFlag()](#module_Electron API..setNotFirstTimeFlag)
    * [~getDefaultLanguage()](#module_Electron API..getDefaultLanguage)
    * [~setDefaultLanguage()](#module_Electron API..setDefaultLanguage)
    * [~openExternalLink()](#module_Electron API..openExternalLink)
    * [~getLogger()](#module_Electron API..getLogger)

<a name="module_Electron API..checkRedirectToWelcomePage"></a>

### Electron API~checkRedirectToWelcomePage()
check whether to redirect to the welcome page or no.
this value is saved in electron store in show-welcome flag.
returns true if first time to open Deer, otherwise, false

**Kind**: inner method of [<code>Electron API</code>](#module_Electron API)  
<a name="module_Electron API..setNotFirstTimeFlag"></a>

### Electron API~setNotFirstTimeFlag()
called to mark that the user has already opened Deer once.
sets the show-welcome flag in electron store to false.

**Kind**: inner method of [<code>Electron API</code>](#module_Electron API)  
<a name="module_Electron API..getDefaultLanguage"></a>

### Electron API~getDefaultLanguage()
retuns user's saved language if it's set, otherwise returns
fallback language.

**Kind**: inner method of [<code>Electron API</code>](#module_Electron API)  
<a name="module_Electron API..setDefaultLanguage"></a>

### Electron API~setDefaultLanguage()
called to save user's language preference by providing defaultLanguage.

**Kind**: inner method of [<code>Electron API</code>](#module_Electron API)  
<a name="module_Electron API..openExternalLink"></a>

### Electron API~openExternalLink()
called to ask main process to open a url in browser.

**Kind**: inner method of [<code>Electron API</code>](#module_Electron API)  
<a name="module_Electron API..getLogger"></a>

### Electron API~getLogger()
called to ask main process to get global object for logger.

**Kind**: inner method of [<code>Electron API</code>](#module_Electron API)  
<a name="Welcome"></a>

## Welcome
Welcome Component

**Kind**: global class  
**Reactprops**: <code>object</code> classes - styles for this component  
**Reactprops**: <code>object</code> theme - theme used generally in App  

* [Welcome](#Welcome)
    * [new Welcome(props)](#new_Welcome_new)
    * [.componentWillMount()](#Welcome+componentWillMount)
    * [.componentWillUnmount()](#Welcome+componentWillUnmount)
    * [.updateLang()](#Welcome+updateLang)
    * [.updateNextLangIndex()](#Welcome+updateNextLangIndex)
    * [.toggleFade()](#Welcome+toggleFade)
    * [.onSaveSettings()](#Welcome+onSaveSettings)
    * [.onLanguageChange()](#Welcome+onLanguageChange)
    * [.render()](#Welcome+render)

<a name="new_Welcome_new"></a>

### new Welcome(props)
this is constructor description.


| Param | Type | Description |
| --- | --- | --- |
| props | <code>object</code> | passed to component |

<a name="Welcome+componentWillMount"></a>

### welcome.componentWillMount()
called when component is mounted.

**Kind**: instance method of [<code>Welcome</code>](#Welcome)  
<a name="Welcome+componentWillUnmount"></a>

### welcome.componentWillUnmount()
called before un-mounting component.

**Kind**: instance method of [<code>Welcome</code>](#Welcome)  
<a name="Welcome+updateLang"></a>

### welcome.updateLang()
Update fadeIn boolean and index, so UI is re-rendered with next values.

**Kind**: instance method of [<code>Welcome</code>](#Welcome)  
<a name="Welcome+updateNextLangIndex"></a>

### welcome.updateNextLangIndex()
Update the index value to point to the next element in the langList
array, and if it has reached the end, it's set to zero.

**Kind**: instance method of [<code>Welcome</code>](#Welcome)  
<a name="Welcome+toggleFade"></a>

### welcome.toggleFade()
Used for inverting values of fadeIn

**Kind**: instance method of [<code>Welcome</code>](#Welcome)  
<a name="Welcome+onSaveSettings"></a>

### welcome.onSaveSettings()
Called when user clicks on next button.

**Kind**: instance method of [<code>Welcome</code>](#Welcome)  
<a name="Welcome+onLanguageChange"></a>

### welcome.onLanguageChange()
Called when user changes language in select box.

**Kind**: instance method of [<code>Welcome</code>](#Welcome)  
<a name="Welcome+render"></a>

### welcome.render()
Rendering method

**Kind**: instance method of [<code>Welcome</code>](#Welcome)  
<a name="NAME"></a>

## NAME
A middleware which acts like a service, because it is stateful
and "long-running" in the background. It provides the ability
for actions to install a function to be run once when a specific
condition is met by an action coming through the system. Think of
it as a thunk that blocks until the condition is met. Example:

```js
const services = { WAIT_UNTIL: require('wait-service').NAME };

{ type: services.WAIT_UNTIL,
  predicate: action => action.type === constants.ADD_ITEM,
  run: (dispatch, getState, action) => {
    // Do anything here. You only need to accept the arguments
    // if you need them. `action` is the action that satisfied
    // the predicate.
  }
}
```

**Kind**: global constant  
