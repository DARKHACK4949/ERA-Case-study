import Image from 'next/image';
import Interactive from '@/components/Interactive';

export default function Page() {
  return (
    <>
      {/* Behind everything: ERA's own 8px grid, plus one blurred blob in the
          active brand accent that follows the pointer. Transform only. */}
      <div className="field" aria-hidden="true">
        <div className="field__grid"></div>
        <div className="field__glow"></div>
      </div>

      <div className="progress" aria-hidden="true"></div>
      
      <header className="bar">
        <span className="bar__mark">ERA<span>Case study</span></span>
        <span className="bar__sp"></span>
        <div className="swatches" role="group" aria-label="Brand">
          <button className="sw" data-b="brand-1" aria-label="Brand 1" aria-pressed="true"  style={{"background": "#5b5bd6"}}></button>
          <button className="sw" data-b="brand-2" aria-label="Brand 2" aria-pressed="false" style={{"background": "#3db9cf"}}></button>
          <button className="sw" data-b="brand-3" aria-label="Brand 3" aria-pressed="false" style={{"background": "#29a383"}}></button>
        </div>
        <button className="ghost" id="mode" aria-label="Toggle colour mode">Dark</button>
      </header>
      <main>
      <section className="hero wrap">
        <p className="eyebrow">Design system · Self directed</p>
        <h1>One system. Three brands. <em>No component knows which.</em></h1>
        <p className="lede">Three brands and two colour modes out of a single component set. This page runs on ERA's own tokens, so the swatches above re-theme it.</p>
        <p className="lede" style={{marginTop:'1.1rem'}}>
          I built it to take a branded house further than a Figma library goes:
          into tokens, components, docs and the code that ships them. Most of
          what is on this page is what I found out by doing that.
        </p>
        {/* Fills the right half with the thesis rather than whitespace: the
            wordmark is set in whichever brand is active, so it changes face,
            colour and corner treatment as you switch. */}
        <aside className="brandcard" aria-label="Active brand">
          <div className="brandcard__word" data-word>ERA</div>
          <dl className="brandcard__facts">
            <div><dt>Brand</dt><dd data-bc-brand>Brand 1</dd></div>
            <div><dt>Typeface</dt><dd data-bc-face>IBM Plex Sans</dd></div>
            <div><dt>Accent</dt><dd className="brandcard__hex"><i data-bc-chip></i><span data-bc-hex>#5b5bd6</span></dd></div>
          </dl>
        </aside>

        <dl className="meta">
          <div><dt>Role</dt><dd>Design, tokens, components, docs</dd></div>
          <div><dt>Timeline</dt><dd>Sept to Oct 2026</dd></div>
          <div><dt>Brands</dt><dd>3, each with its own typeface</dd></div>
          <div><dt>Components</dt><dd>23</dd></div>
          <div><dt>Contrast</dt><dd>138 of 138 at AA</dd></div>
        </dl>
      </section>
      
      <hr className="rule" />
      
      <section className="wrap">
        <p className="eyebrow">The claim</p>
        <h2 className="col">One Button component. Three brands.</h2>
        <p className="body col">Nothing in the markup changes between these. The accent, the typeface and the corner radius all come from tokens.</p>
        <div className="trio">
          <figure><div className="frame"><Image src="/img/b1-button.jpg" alt="ERA Button in Brand 1: purple fill, IBM Plex Sans, rounded corners." width={810} height={882} sizes="(max-width:760px) 100vw, 30vw" /></div>
            <figcaption><b>Brand 1</b>Iris fill, white label, 8px radius.</figcaption></figure>
          <figure><div className="frame"><Image src="/img/b2-button.jpg" alt="The same Button in Brand 2: cyan fill, Geist, square corners." width={822} height={881} sizes="(max-width:760px) 100vw, 30vw" /></div>
            <figcaption><b>Brand 2</b>Cyan fill, dark label, 2px radius.</figcaption></figure>
          <figure><div className="frame"><Image src="/img/b3-button.jpg" alt="The same Button in Brand 3: green fill, Source Sans 3, sharp corners." width={772} height={883} sizes="(max-width:760px) 100vw, 30vw" /></div>
            <figcaption><b>Brand 3</b>Jade fill, dark label, square.</figcaption></figure>
        </div>
        <p className="note">Captured from Storybook at the same viewport, switching only the brand global.</p>
      </section>
      
      <hr className="rule" />
      
      <section className="wrap">
        <p className="eyebrow">The problem</p>
        <h2 className="col">Four ways a shared library breaks</h2>
        <div className="modes">
          <div className="mode"><span className="mode__n">01</span><div><h3>The fork</h3><p>Someone copies Button into Button2 instead of finding the value that should have been a token.</p></div></div>
          <div className="mode"><span className="mode__n">02</span><div><h3>The flag</h3><p>The component starts carrying <code>if (brand === 'b2')</code>, so every new brand means editing every component.</p></div></div>
          <div className="mode"><span className="mode__n">03</span><div><h3>The quiet accessibility hole</h3><p>One accent passes contrast, the next one does not, and nobody checks. This is the one I hit.</p></div></div>
          <div className="mode"><span className="mode__n">04</span><div><h3>The documentation lie</h3><p>The docs show one brand. Anyone building for the other two is guessing.</p></div></div>
        </div>
        <p className="body col" style={{"marginTop": "1.75rem"}}>Same root cause every time: <strong>the component is allowed to know something it should not.</strong></p>
      </section>
      
      <hr className="rule" />
      
      <section className="wrap">
        <p className="eyebrow">The architecture</p>
        <h2 className="col">Three layers, one readable</h2>
        <p className="body col">Primitives hold raw values. Brand re-points them per brand. Semantics re-points brand per mode, and is the only layer a component may read.</p>
      
        <div className="chain">
          <div className="chain__head"><span className="dot" aria-hidden="true"></span><span>Live, read from this page's computed styles</span></div>
          <div className="chain__row"><span className="tier">Semantics</span><code>--sem-primary-bg</code><span className="val" data-token="--sem-primary-bg"><i></i><em></em></span></div>
          <div className="chain__row"><span className="tier">Brand</span><code data-role>--brand-primary-roles-action</code><span className="val" data-token="--brand-primary-roles-action"><i></i><em></em></span></div>
          <div className="chain__row"><span className="tier">Primitive</span><code data-primitive>--colors-iris-700</code><span className="val" data-token="--colors-iris-700"><i></i><em></em></span></div>
          <dl className="chain__foot">
            <div><dt>Typeface</dt><dd data-face>IBM Plex Sans</dd></div>
            <div><dt>Button radius</dt><dd data-radius>8px</dd></div>
            <div><dt>Label on fill</dt><dd data-onfill>White</dd></div>
          </dl>
        </div>
        <p className="note">Switch brand or mode above and every row moves. The button reading <code>--sem-primary-bg</code> never learns that <span data-ramp>Iris</span> exists.</p>
      
        <p className="body col" style={{"marginTop": "2.25rem"}}>The rule that holds it up: <strong>no component contains a hex value, a pixel radius, or a raw spacing number.</strong> That is what makes a fourth brand a data change, not a code change.</p>
      </section>
      
      <hr className="rule" />
      
      <section className="wrap">
        <p className="eyebrow">Figma to code</p>
        <h2 className="col">A build that refuses to lie</h2>
        <div className="stats">
          <div className="stat"><b>762</b><span>Figma variables, three collections</span></div>
          <div className="stat"><b>1,505</b><span>CSS custom properties generated</span></div>
          <div className="stat"><b>6</b><span>brand and mode combinations, one source</span></div>
        </div>
        <p className="body col" style={{"marginTop": "2rem"}}>Tokens are exported from Figma and built, never hand written. <strong>The build exits non-zero on any reference that does not resolve</strong>, so Figma and code cannot quietly drift apart.</p>
        <figure className="wide"><div className="frame"><Image src="/img/tokens.jpg" alt="The How tokens work page of the ERA documentation site." width={1200} height={833} sizes="(max-width:1200px) 100vw, 1100px" /></div>
          <figcaption>The token page, generated from the live build.</figcaption></figure>
      </section>
      
      <hr className="rule" />
      
      <section className="wrap">
        <p className="eyebrow">Accessibility</p>
        <h2 className="col">The audit failed 10 of 23 pairs</h2>
        <p className="body col">A live audit resolves the real computed colour of every foreground and background pair, per brand and per mode. Both causes were in the tokens, not in any component.</p>
      
        <div className="stats">
          <div className="stat bad"><b>10 / 23</b><span>below AA on the first run</span></div>
          <div className="stat good"><b>138 / 138</b><span>at AA now, across three brands and two modes</span></div>
          <div className="stat"><b>1</b><span>documented exemption per combination</span></div>
        </div>
      
        <h3 style={{"marginTop": "3rem", "fontSize": "1.25rem"}}>The neutral ramp was carrying text</h3>
        <p className="body col">Four ramp steps, rendered live on this page's surface. Only two can hold body text.</p>
        <div className="ramp" data-ramp-grid>
          <div className="ramp__row" data-step="700"><span className="sample">The quick brown fox<span className="tok">--brand-neutral-700</span></span><span className="ratio"></span><span className="verdict"></span></div>
          <div className="ramp__row" data-step="800"><span className="sample">The quick brown fox<span className="tok">--brand-neutral-800</span></span><span className="ratio"></span><span className="verdict"></span></div>
          <div className="ramp__row" data-step="900"><span className="sample">The quick brown fox<span className="tok">--brand-neutral-900</span></span><span className="ratio"></span><span className="verdict"></span></div>
          <div className="ramp__row" data-step="950"><span className="sample">The quick brown fox<span className="tok">--brand-neutral-950</span></span><span className="ratio"></span><span className="verdict"></span></div>
        </div>
        <p className="note">Ratios computed in the browser from the resolved token values, in whichever mode you are viewing.</p>
        <p className="body col" style={{"marginTop": "1.5rem"}}><strong>Hierarchy in text comes from size and weight, not from a third grey.</strong></p>
      
        <h3 style={{"marginTop": "3rem", "fontSize": "1.25rem"}}>One token assumed brands are interchangeable</h3>
        <p className="body col">The label on the solid fill was a single global white. Each card below is a real nested brand scope, measured live.</p>
        <div className="fills" data-fills>
          <div className="fill" data-brand="brand-1">
            <div className="fill__band">
              <div className="fill__try" data-fg="--colors-color-base-white"><span>White label</span><b></b></div>
              <div className="fill__try" data-fg="--colors-grey-950"><span>Near black ink</span><b></b></div>
            </div>
            <div className="fill__foot"><span>Brand 1</span><b></b></div>
          </div>
          <div className="fill" data-brand="brand-2">
            <div className="fill__band">
              <div className="fill__try" data-fg="--colors-color-base-white"><span>White label</span><b></b></div>
              <div className="fill__try" data-fg="--colors-grey-950"><span>Near black ink</span><b></b></div>
            </div>
            <div className="fill__foot"><span>Brand 2</span><b></b></div>
          </div>
          <div className="fill" data-brand="brand-3">
            <div className="fill__band">
              <div className="fill__try" data-fg="--colors-color-base-white"><span>White label</span><b></b></div>
              <div className="fill__try" data-fg="--colors-grey-950"><span>Near black ink</span><b></b></div>
            </div>
            <div className="fill__foot"><span>Brand 3</span><b></b></div>
          </div>
        </div>
        <p className="note">The outlined row is the one that passes. Both candidates are real tokens, white and <code>--colors-grey-950</code>, measured against each brand's own fill. There is no single answer across the three, which is the finding. The fix was a brand role token so each brand answers for its own fill.</p>
      
        <h3 style={{"marginTop": "3rem", "fontSize": "1.25rem"}}>The one exemption</h3>
        <p className="body col">A disabled control's label sits below 4.5:1 on purpose. WCAG 1.4.3 exempts inactive controls, and a disabled button at full contrast stops reading as disabled. It moved from <strong>1.68:1 to 3.33:1</strong>: legible, without pretending to be active.</p>
      
        <figure className="wide"><div className="frame"><Image src="/img/audit.jpg" alt="The accessibility page of the ERA documentation site." width={1200} height={957} sizes="(max-width:1200px) 100vw, 1100px" /></div>
          <figcaption>The audit lives in Storybook, because a document can claim a pass and a live audit cannot.</figcaption></figure>
      </section>
      
      <hr className="rule" />
      
      <section className="wrap">
        <p className="eyebrow">What went wrong</p>
        <h2 className="col">Three bugs worth writing down</h2>
      
        <div className="specimens">
          <div className="spec"><span className="spec__big" style={{"fontFamily": "'IBM Plex Sans'"}}>Release payment</span><span className="spec__name">Brand 1 · IBM Plex Sans</span></div>
          <div className="spec"><span className="spec__big" style={{"fontFamily": "'Geist'"}}>Release payment</span><span className="spec__name">Brand 2 · Geist</span></div>
          <div className="spec"><span className="spec__big" style={{"fontFamily": "'Source Sans 3'"}}>Release payment</span><span className="spec__name">Brand 3 · Source Sans 3</span></div>
        </div>
        <p className="note">Three faces, actually loaded. For weeks they were not, and nothing looked broken.</p>
      
        <div className="bugs">
          <div className="bug">
            <span className="bug__tag">01 · silent fallback</span>
            <h3>Three typefaces that were never loaded</h3>
            <p>The tokens were right. The brands were switching. Every one of them rendered in the system font stack, because no web font was ever loaded.</p>
            <p>I fixed it in Storybook. Building this page, I checked the docs site the same way and found the identical bug still live there: zero font files shipped, no <code>@font-face</code> rules. Every screenshot here was retaken after fixing it.</p>
            <div className="pull">A multi brand system fails silently by design, because the fallback of any brand looks like a plausible brand.</div>
          </div>
          <div className="bug">
            <span className="bug__tag">02 · wrong mental model</span>
            <h3>Custom properties resolve where they are declared</h3>
            <p>The semantic layer was declared on <code>&lt;html&gt;</code>, so a nested brand scope resolved against the root brand and showed the wrong accent. A custom property is substituted where it is <strong>declared</strong>, not where it is used. The three fill cards above are that fix working.</p>
          </div>
          <div className="bug">
            <span className="bug__tag">03 · shared primitive</span>
            <h3>The menu that sized to the wrong thing</h3>
            <p>Menu and Select share a popup surface. A Select's options should match its trigger, because that is the control's shape. A Menu's items should size to their content, because they are commands. One surface, two rules.</p>
          </div>
        </div>
      </section>
      
      <hr className="rule" />
      
      <section className="wrap">
        <p className="eyebrow">What shipped</p>
        <h2 className="col">23 components, weighted to the hard parts</h2>
        <p className="body col">A field with seven states, a menu implementing the full WAI-ARIA menu button pattern, a Select built as a listbox. Modal is a real <code>&lt;dialog&gt;</code>, Accordion is <code>&lt;details&gt;</code>, so in-page find still works.</p>
      
        <div className="gallery">
          <figure className="g-2"><div className="frame frame--tall"><Image src="/img/c-button.jpg" alt="ERA Button in five intents." width={810} height={882} sizes="(max-width:760px) 100vw, (max-width:900px) 50vw, 30vw" /></div><figcaption><b>Button</b>Five intents, chosen by hierarchy.</figcaption></figure>
          <figure className="g-2"><div className="frame frame--tall"><Image src="/img/c-input.jpg" alt="ERA Input component in seven states." width={776} height={1303} sizes="(max-width:760px) 100vw, (max-width:900px) 50vw, 30vw" /></div><figcaption><b>Input</b>Seven states, one component.</figcaption></figure>
          <figure className="g-2"><div className="frame frame--tall"><Image src="/img/c-alert.jpg" alt="ERA Alert component in four tones." width={900} height={636} sizes="(max-width:760px) 100vw, (max-width:900px) 50vw, 30vw" /></div><figcaption><b>Alert</b>Four tones, optional actions.</figcaption></figure>
          <figure className="g-3"><div className="frame frame--wide"><Image src="/img/c-badge.jpg" alt="ERA Badge component matrix." width={788} height={418} sizes="(max-width:760px) 100vw, 45vw" /></div><figcaption><b>Badge</b>Tone and variant matrix.</figcaption></figure>
          <figure className="g-3"><div className="frame frame--wide"><Image src="/img/c-card.jpg" alt="ERA Card component elevations." width={900} height={190} sizes="(max-width:760px) 100vw, 45vw" /></div><figcaption><b>Card</b>Elevation as hierarchy.</figcaption></figure>
        </div>
      
        <div className="duo">
          <figure><div className="frame"><Image src="/img/button.jpg" alt="The Button documentation page with a live playground." width={1200} height={957} sizes="(max-width:760px) 100vw, 50vw" /></div>
            <figcaption><b>Component pages</b>When to reach for it, and when not to.</figcaption></figure>
          <figure><div className="frame"><Image src="/img/colour.jpg" alt="The colour foundations page generated from live tokens." width={1200} height={957} sizes="(max-width:760px) 100vw, 50vw" /></div>
            <figcaption><b>Foundations</b>Generated from live tokens, so they cannot go stale.</figcaption></figure>
        </div>
      
        <p className="body col" style={{"marginTop": "2rem"}}><strong>Storybook is for the person building the component. The docs are for the person deciding whether to use it.</strong></p>
      
        <div className="links">
          <a className="solid" href="https://darkhack4949.github.io/Era-Design-Foundation-Story-book/" target="_blank" rel="noopener">Documentation site</a>
          <a href="https://darkhack4949.github.io/Era-Design-Foundation-Story-book/storybook/" target="_blank" rel="noopener">Storybook</a>
          <a href="https://github.com/DARKHACK4949/Era-Design-Foundation-Story-book" target="_blank" rel="noopener">Repository</a>
        </div>
      </section>
      
      <hr className="rule" />
      
      <section className="wrap">
        <p className="eyebrow">Reflection</p>
        <h2 className="col">What I would do differently</h2>
        <div className="modes">
          <div className="mode"><span className="mode__n">01</span><div><h3>Audit contrast before building components</h3><p>The audit was the highest value thing I built, and I built it last. At the token stage it would have caught the global white on day one.</p></div></div>
          <div className="mode"><span className="mode__n">02</span><div><h3>Verify what renders, not what is configured</h3><p>The typeface bug existed because I checked the tokens instead of checking what the browser drew.</p></div></div>
          <div className="mode"><span className="mode__n">03</span><div><h3>Decide the token set deliberately</h3><p>Around 40 unused brand role tokens are a bet on future need. Unused tokens teach people that tokens are optional.</p></div></div>
        </div>
        <h3 style={{"marginTop": "2rem"}}>Still open</h3>
        <ul className="open">
          <li>A changelog, so consumers do not have to diff it themselves.</li>
          <li>Search covers page titles only, not prose.</li>
          <li>Visual regression tests. A token change that breaks Brand 2 dark is currently only caught by someone looking.</li>
        </ul>
      </section>
      </main>

      <footer className="wrap"><p>ERA is a self directed design system. This page runs on its tokens and switches with it.</p></footer>
      <Interactive />
    </>
  );
}
