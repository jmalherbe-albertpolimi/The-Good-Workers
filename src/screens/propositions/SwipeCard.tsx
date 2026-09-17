import { useState } from 'react';
import { motion, useAnimation, useMotionValue, useTransform, type PanInfo } from 'framer-motion';
import { Check, X } from 'lucide-react';
import type { Mission } from '../../data/types';
import { CompanyLogo } from '../../components/CompanyLogo';
import { formatDate, formatHours, splitEuro } from '../../lib/format';

export type Decision = 'accept' | 'refuse';

interface Props {
  mission: Mission;
  onDecide: (d: Decision) => void;
  onDetails: () => void;
}

const SWIPE_DISTANCE = 110;
const SWIPE_VELOCITY = 700;

export function SwipeCard({ mission, onDecide, onDetails }: Props) {
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-250, 250], [-12, 12]);
  const acceptOpacity = useTransform(x, [30, 120], [0, 1]);
  const refuseOpacity = useTransform(x, [-120, -30], [1, 0]);
  const controls = useAnimation();
  const [leaving, setLeaving] = useState(false);
  const price = splitEuro(mission.price);

  const fly = async (dir: 1 | -1) => {
    if (leaving) return;
    setLeaving(true);
    await controls.start({
      x: dir * 700,
      rotate: dir * 25,
      opacity: 0,
      transition: { duration: 0.35, ease: 'easeIn' },
    });
    onDecide(dir === 1 ? 'accept' : 'refuse');
  };

  const onDragEnd = (_: unknown, info: PanInfo) => {
    if (info.offset.x > SWIPE_DISTANCE || info.velocity.x > SWIPE_VELOCITY) fly(1);
    else if (info.offset.x < -SWIPE_DISTANCE || info.velocity.x < -SWIPE_VELOCITY) fly(-1);
  };

  return (
    <motion.div
      className="absolute inset-0 flex touch-pan-y flex-col overflow-hidden rounded-[28px] bg-white shadow-[0_12px_40px_rgba(0,0,0,0.14)]"
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.9}
      onDragEnd={onDragEnd}
      style={{ x, rotate }}
      animate={controls}
    >
      <div className="mx-auto mt-3 h-1.5 w-12 rounded-full bg-black/15" />

      <div className="flex flex-1 flex-col px-6 pt-7">
        <div className="flex items-center gap-4">
          <CompanyLogo company={mission.company} size={80} />
          <div className="min-w-0">
            <div className="truncate text-lg font-bold">{mission.company.name}</div>
            <div className="tnum text-[clamp(36px,11vw,52px)] font-black leading-none tracking-tighter">
              {price.int},{price.dec}€
            </div>
          </div>
        </div>

        <dl className="mt-8 space-y-4 text-[16px]">
          <div className="flex justify-between gap-3 whitespace-nowrap">
            <div>
              <dt className="inline text-muted">Date </dt>
              <dd className="inline font-semibold">{formatDate(mission.date)}</dd>
            </div>
            <div>
              <dt className="inline text-muted">Heures </dt>
              <dd className="inline font-semibold">{formatHours(mission.startTime, mission.endTime)}</dd>
            </div>
          </div>
          <div className="flex justify-between gap-3">
            <div className="min-w-0 truncate">
              <dt className="inline text-muted">Lieu </dt>
              <dd className="inline font-semibold">{mission.city}</dd>
            </div>
            <div className="whitespace-nowrap">
              <dt className="inline text-muted">Student </dt>
              <dd className="inline font-semibold">{mission.studentsCount}</dd>
            </div>
          </div>
        </dl>

        <div className="flex-1" />

        <button
          type="button"
          onClick={onDetails}
          className="mb-5 w-full rounded-full bg-tile py-4 text-lg font-semibold active:bg-black/10"
        >
          Plus de détails
        </button>
      </div>

      <div className="flex items-center justify-center gap-12 bg-tile py-6">
        <button
          type="button"
          aria-label="Refuser"
          onClick={() => fly(-1)}
          className="flex h-[68px] w-[68px] items-center justify-center rounded-full bg-white shadow-[0_4px_14px_rgba(0,0,0,0.08)] active:scale-95"
        >
          <X size={36} strokeWidth={3} className="text-danger" />
        </button>
        <button
          type="button"
          aria-label="Accepter"
          onClick={() => fly(1)}
          className="flex h-[68px] w-[68px] items-center justify-center rounded-full bg-white shadow-[0_4px_14px_rgba(0,0,0,0.08)] active:scale-95"
        >
          <Check size={36} strokeWidth={3} className="text-teal" />
        </button>
      </div>

      <motion.div
        style={{ opacity: acceptOpacity }}
        className="pointer-events-none absolute left-6 top-16 -rotate-12 rounded-xl border-4 border-teal px-3 py-1 text-3xl font-black text-teal"
      >
        ACCEPTER
      </motion.div>
      <motion.div
        style={{ opacity: refuseOpacity }}
        className="pointer-events-none absolute right-6 top-16 rotate-12 rounded-xl border-4 border-danger px-3 py-1 text-3xl font-black text-danger"
      >
        REFUSER
      </motion.div>
    </motion.div>
  );
}
