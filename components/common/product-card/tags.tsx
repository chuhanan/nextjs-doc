import React, { useState, useEffect } from 'react'
import WeeklySold from './weeklySold'
import RemainCount from './remainCount'
import Bogo from './bogo'

export default function Tags(props: Partial<any>) {
  const { showAllTags = false, showActivity, showLeft = true, showWeekly, data } = props
  const [showBogo, setShowBogo] = useState<boolean>(false)
  const [showRemainCount, setShowRemainCount] = useState<boolean>(false)
  const [showWeeklySold, setShowWeeklySold] = useState<boolean>(false)
  useEffect(() => {
    if (showAllTags) {
      setShowBogo(true)
      setShowRemainCount(true)
      setShowWeeklySold(true)
      return
    }
    if (showActivity) {
      if (data?.activity_tag_list?.length > 0) {
        setShowBogo(true)
        return
      }
    }
    if (showLeft) {
      const remainCount = 10
      if (remainCount > 0) {
        setShowRemainCount(true)
        return
      }
    }
    if (showWeekly) {
      const weekSoldCount = data?.last_week_sold_count_ui !== '0' ? data?.last_week_sold_count_ui : ''
      if (weekSoldCount) {
        setShowWeeklySold(true)
        return
      }
    }
  }, [showAllTags, showActivity, showLeft, showWeekly, data])

  return (
    <div className="mt-2 flex flex-col justify-start items-start">
      {!showAllTags && showBogo && <Bogo {...props} />}
      {!showAllTags && showRemainCount && <RemainCount {...props} />}
      {showWeeklySold && <WeeklySold {...props} />}
      {showAllTags && showRemainCount && <RemainCount {...props} />}
      {showAllTags && showBogo && <Bogo {...props} />}
    </div>
  )
}
