import s from "./SpaceBackdrop.module.css";

export default function SpaceBackdrop() {
  return (
    <>
      <div className={s.nebula} aria-hidden="true" />
      <div className={s.aurora} aria-hidden="true">
        <span className={s.a1} />
        <span className={s.a2} />
        <span className={s.a3} />
        <span className={s.a4} />
      </div>
      <div className={s.grid} aria-hidden="true" />
      <div className={s.noise} aria-hidden="true" />
      <div className={s.vignette} aria-hidden="true" />
      <div className={s.scanlines} aria-hidden="true" />
    </>
  );
}
